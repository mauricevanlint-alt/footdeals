import { getStore } from "@netlify/blobs";

const ds = () => getStore({ name: "footdeals-data", consistency: "strong" });
const bs = () => getStore({ name: "footdeals-backups", consistency: "strong" });

function ageDays(value: unknown) {
  const t = new Date(String(value || "")).getTime();
  return Number.isFinite(t) ? Math.floor((Date.now() - t) / 86400000) : 999;
}

export default async () => {
  try {
    const store = ds();
    const settings: any = (await store.get("settings", { type: "json" })) || {};
    const limit = Math.min(30, Math.max(3, Number(settings.autoPauseDays) || 7));
    const deals: any = await store.get("deals", { type: "json" });
    if (!Array.isArray(deals)) return Response.json({ ok: true, changed: 0 });

    let changed = 0;
    const now = Date.now();
    const stamp = new Date().toISOString();
    const next = deals.map((d: any) => {
      if (d.status !== "active") return d;
      let reason = "";
      if (d.expires) {
        const t = new Date(`${d.expires}T23:59:59`).getTime();
        if (Number.isFinite(t) && t < now) reason = "expired";
      }
      if (!reason && ageDays(d.verified_at) > limit) reason = "stale";
      if (!reason) return d;
      changed++;
      return { ...d, status: "paused", auto_pause_reason: reason, auto_paused_at: stamp };
    });

    if (changed) {
      const key = `deals/${stamp.replace(/[:.]/g, "-")}__before-stale-sweep`;
      await bs().setJSON(key, { at: stamp, reason: "before-stale-sweep", deals });
      await store.setJSON("deals", next);
    }

    return Response.json({ ok: true, changed, limit });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false }, { status: 500 });
  }
};

export const config = { schedule: "@daily" };
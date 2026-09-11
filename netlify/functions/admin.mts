import { getStore } from "@netlify/blobs";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });

const adminSecret = () => Netlify.env.get("FOOTDEALS_ADMIN_SECRET") || "";
const ds = () => getStore({ name: "footdeals-data", consistency: "strong" });
const bs = () => getStore({ name: "footdeals-backups", consistency: "strong" });
const text = (v: unknown, n = 180) => String(v ?? "").trim().slice(0, n);
const safeUrl = (v: unknown) => {
  try {
    const u = new URL(String(v || ""));
    return ["http:", "https:"].includes(u.protocol) ? u.href : "";
  } catch {
    return "";
  }
};

function cleanImportedDeal(raw: any) {
  const old = Math.max(0, Number(raw?.old) || 0);
  const price = Math.max(0, Number(raw?.price) || 0);
  const id = Number(raw?.id);
  const affiliateUrl = safeUrl(raw?.affiliate_url);
  return {
    ...raw,
    id: Number.isSafeInteger(id) && id > 0 ? id : 0,
    cat: ["Maillots", "Crampons", "Vêtements", "Équipement"].includes(raw?.cat)
      ? raw.cat
      : "Équipement",
    brand: text(raw?.brand, 80),
    name: text(raw?.name, 180),
    merchant: text(raw?.merchant, 80),
    kind: text(raw?.kind, 90),
    image_url: safeUrl(raw?.image_url),
    old,
    price,
    discount: old > price ? Math.round((1 - price / old) * 100) : 0,
    url: safeUrl(raw?.url),
    affiliate_url: affiliateUrl,
    source: text(raw?.source, 120),
    affiliate: Boolean(raw?.affiliate || affiliateUrl),
    featured: Boolean(raw?.featured),
    expires: text(raw?.expires, 20),
    verified_at: text(raw?.verified_at, 50) || new Date().toISOString(),
    updated: text(raw?.updated, 30) || new Date().toLocaleDateString("fr-BE"),
    verified: text(raw?.verified, 160),
    status: ["active", "draft", "paused"].includes(raw?.status) ? raw.status : "draft",
    share_text: text(raw?.share_text, 220),
    notes: text(raw?.notes, 500),
    created_at: text(raw?.created_at, 50) || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

async function snapshot(reason = "manual") {
  const deals = (await ds().get("deals", { type: "json" })) || [];
  const key = `deals/${new Date().toISOString().replace(/[:.]/g, "-")}__${String(reason).replace(/[^a-z0-9_-]+/gi, "-")}`;
  await bs().setJSON(key, { at: new Date().toISOString(), reason, deals });
  return key;
}

export default async (req: Request) => {
  const secret = adminSecret();
  if (!secret) return json({ error: "Configuration admin manquante sur Netlify" }, 503);
  if ((req.headers.get("authorization") || "") !== `Bearer ${secret}`)
    return json({ error: "Accès administrateur requis" }, 401);

  try {
    const u = new URL(req.url);
    const action = u.searchParams.get("action") || "";

    if (req.method === "GET" && action === "ping") return json({ ok: true });

    if (req.method === "GET" && action === "backups") {
      const list = (await bs().list({ prefix: "deals/" })).blobs || [];
      return json({
        backups: list
          .map((x: any) => ({ key: x.key }))
          .sort((a: any, b: any) => b.key.localeCompare(a.key))
          .slice(0, 30),
      });
    }

    if (req.method === "POST" && action === "backup")
      return json({ ok: true, key: await snapshot("manual") }, 201);

    if (req.method === "POST" && action === "restore") {
      const body = await req.json().catch(() => ({} as any));
      if (!(body as any).key) return json({ error: "Sauvegarde manquante" }, 400);
      const snap: any = await bs().get((body as any).key, { type: "json" });
      if (!snap || !Array.isArray(snap.deals)) return json({ error: "Sauvegarde introuvable" }, 404);
      await snapshot("before-restore");
      await ds().setJSON("deals", snap.deals);
      return json({ ok: true, count: snap.deals.length });
    }

    if (req.method === "POST" && action === "import") {
      const body: any = await req.json().catch(() => ({}));
      if (!Array.isArray(body.deals) || body.deals.length > 1000)
        return json({ error: "JSON de deals invalide" }, 400);

      const deals = body.deals.map(cleanImportedDeal);
      const ids = new Set<number>();
      for (const d of deals) {
        if (!d.id || !d.name || !d.merchant || !d.url)
          return json({ error: "Import refusé : une offre est incomplète ou contient une URL invalide" }, 400);
        if (ids.has(d.id)) return json({ error: `Import refusé : ID ${d.id} en double` }, 400);
        ids.add(d.id);
      }

      await snapshot("before-import");
      await ds().setJSON("deals", deals);
      return json({ ok: true, count: deals.length });
    }

    return json({ error: "Action invalide" }, 400);
  } catch (error) {
    console.error(error);
    return json({ error: "Erreur admin" }, 500);
  }
};

export const config = { path: "/api/admin" };

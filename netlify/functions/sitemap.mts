import { getStore } from "@netlify/blobs";

const esc = (value: unknown) =>
  String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  }[c] as string));

export default async () => {
  const base = "https://footdeals.netlify.app";
  let launch = false;
  let deals: any[] = [];
  try {
    const store = getStore({ name: "footdeals-data" });
    const settings: any = await store.get("settings", { type: "json" });
    launch = Boolean(settings?.launch);
    const raw: any = await store.get("deals", { type: "json" });
    deals = Array.isArray(raw) ? raw : [];
  } catch {}

  const staticUrls = launch
    ? [
        "/",
        "/maillots.html",
        "/crampons.html",
        "/vetements.html",
        "/equipement.html",
        "/a-propos.html",
        "/affiliation.html",
        "/confidentialite.html",
        "/mentions-legales.html",
      ]
    : [];

  const now = Date.now();
  const dealUrls = launch
    ? deals
        .filter((d) => d?.status === "active" && Number(d?.id) > 0)
        .filter((d) => {
          if (!d.expires) return true;
          const t = new Date(`${d.expires}T23:59:59`).getTime();
          return !Number.isFinite(t) || t >= now;
        })
        .map((d) => `/d/${Number(d.id)}`)
    : [];

  const urls = [...staticUrls, ...dealUrls];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((path, i) => {
      const isDeal = path.startsWith("/d/");
      const changefreq = isDeal || i < 5 ? "daily" : "monthly";
      const priority = path === "/" ? "1.0" : isDeal ? "0.7" : i < 5 ? "0.8" : "0.4";
      return `\n  <url><loc>${esc(base + path)}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    })
    .join("")}\n</urlset>`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
};

export const config = { path: "/sitemap.xml" };

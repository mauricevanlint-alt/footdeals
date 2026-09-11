import { getStore } from "@netlify/blobs";export default async()=>{let launch=false;try{const s=await getStore({name:'footdeals-data'}).get('settings',{type:'json'});launch=Boolean(s?.launch)}catch{}const body=launch?`User-agent: *
Allow: /
Sitemap: https://footdeals.netlify.app/sitemap.xml
`:`User-agent: *
Disallow: /
`;return new Response(body,{headers:{'content-type':'text/plain; charset=utf-8','cache-control':'no-store'}})};export const config={path:"/robots.txt"};
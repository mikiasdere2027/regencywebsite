import { REGENCY_ORIGIN } from '../site';

/** sitemap.xml for regencyparkingservice.com. */
export const dynamic = 'force-static';

const PATHS = ['/', '/services', '/about', '/contact'];

export function GET() {
  const urls = PATHS.map((p) => `  <url><loc>${REGENCY_ORIGIN}${p === '/' ? '' : p}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}

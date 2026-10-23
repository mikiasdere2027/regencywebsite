import { REGENCY_ORIGIN } from '../site';

/** robots.txt for regencyparkingservice.com. */
export const dynamic = 'force-static';

export function GET() {
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${REGENCY_ORIGIN}/sitemap.xml`, ''].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}

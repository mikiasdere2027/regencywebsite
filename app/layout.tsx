import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import RegencyHeader from './RegencyHeader';
import RegencyFooter from './RegencyFooter';
import { ADDRESS, IMG, PHONE, REGENCY_ORIGIN } from './site';
import { regencyBase } from './base';
import styles from './page.module.css';

/**
 * Standalone shell for the Regency Parking Services website.
 * The site owns its header, footer, robots.txt and sitemap.xml.
 */

export const metadata: Metadata = {
  metadataBase: new URL(REGENCY_ORIGIN),
  title: { absolute: 'Regency Parking Services | Houston Valet Parking', template: '%s | Regency Parking Services' },
  robots: { index: true, follow: true },
  openGraph: { type: 'website', siteName: 'Regency Parking Services', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  icons: { icon: `${IMG}/favicon.png`, apple: `${IMG}/apple-touch-icon.png` },
};

export default function RegencyLayout({ children }: { children: ReactNode }) {
  const base = regencyBase();
  return (
    <div id="top" className={styles.site}>
      <RegencyHeader base={base} logo={`${IMG}/RP-newlogo1.png`} phone={PHONE} address={ADDRESS.join(', ')} />
      {children}
      <RegencyFooter base={base} />
    </div>
  );
}

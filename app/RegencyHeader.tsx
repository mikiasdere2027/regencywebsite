'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';

// Real paths, not bare anchors, so the header works the same on every page.
// The standalone site is served from the domain root.
const linksFor = (base: string) => [
  { href: base || '/', label: 'Home' },
  { href: `${base}/services`, label: 'Services' },
  { href: `${base}/about`, label: 'About Us' },
  { href: `${base}/contact`, label: 'Contact' },
];

/**
 * Over the hero: a contact bar, then the logo beside a white nav panel that
 * ends in a solid call-to-action block. Once the page scrolls the contact bar
 * folds away and the whole header goes solid.
 */
export default function RegencyHeader({
  logo,
  phone,
  address,
  base,
}: {
  base: string;
  logo: string;
  phone: string;
  address: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const tel = `tel:${phone.replace(/-/g, '')}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.headerSolid : ''}`}>
      <div className={styles.topbar}>
        <div className={`${styles.wrap} ${styles.topbarInner}`}>
          <a href={tel}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="7" y="2" width="10" height="20" rx="2" />
              <path d="M11 18h2" />
            </svg>
            {phone}
          </a>
          <span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {address}
          </span>
        </div>
      </div>
      <div className={`${styles.wrap} ${styles.headerInner}`}>
        <a href={base || '/'} className={styles.logo} aria-label="Regency Parking Service — home">
          {/* eslint-disable-next-line @next/next/no-img-element -- static client asset */}
          <img src={logo} alt="" width={108} height={60} />
        </a>
        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`} aria-label="Main">
          <div className={styles.navLinks}>
            {linksFor(base).map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={l.href === pathname ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
          <a className={styles.navCta} href={`${base}/#quote`} onClick={() => setOpen(false)}>
            Request a Proposal
          </a>
        </nav>
        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

import FooterSignup from './FooterSignup';
import { ADDRESS, IMG, LOGO_HORIZONTAL, MAP_URL, PHONE } from './site';
import styles from './page.module.css';

/** Shared footer for every Regency mockup page; carries the contact details. */
export default function RegencyFooter({ base }: { base: string }) {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.footerBg} style={{ backgroundImage: `url(${IMG}/houston-city.jpg)` }} aria-hidden="true" />
      <div className={`${styles.wrap} ${styles.footerGrid}`}>
        <div className={styles.footerLeft}>
          <h2 className={styles.footerHeading}>Sign up here for regular updates on new events and offers</h2>
          <FooterSignup />

          <a href={`${base}/#quote`} className={styles.promo}>
            <span className={styles.promoText}>
              <strong>Pre-Register here for Valet Parking</strong>
              <span className={styles.promoBtn}>Book now!</span>
            </span>
            <span className={styles.promoBadge} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3 17v-4l2-4.5h8l2 4.5v4z" />
                <path d="M3 13h12M5 17v1.5M13 17v1.5" />
                <path d="M18 21V4M18 4h2.5a2 2 0 0 1 0 4H18" />
              </svg>
            </span>
            <span className={styles.road} aria-hidden="true">
              <svg className={styles.car} viewBox="0 0 120 44">
                <path
                  className={styles.carBody}
                  d="M6 30c0-5 3-8 9-9l14-2 13-9c3-2 6-3 10-3h26c5 0 9 2 12 5l9 8 12 2c5 1 7 4 7 8v4c0 2-1 3-3 3H9c-2 0-3-1-3-3z"
                />
                <path className={styles.carGlass} d="M34 19l11-8c2-1 4-2 7-2h10v10zM66 9h13c3 0 6 1 8 3l7 7H66z" />
                <circle className={styles.carLight} cx="10" cy="28" r="2" />
                <g className={styles.wheel} style={{ transformOrigin: '30px 36px' }}>
                  <circle cx="30" cy="36" r="7" />
                  <path d="M30 30v12M24 36h12" />
                </g>
                <g className={styles.wheel} style={{ transformOrigin: '94px 36px' }}>
                  <circle cx="94" cy="36" r="7" />
                  <path d="M94 30v12M88 36h12" />
                </g>
              </svg>
            </span>
          </a>
        </div>

        <div className={styles.footerRight}>
          <nav aria-label="Footer">
            <h2 className={styles.footerHeading}>Useful links</h2>
            <ul className={styles.footerLinks}>
              <li><a href={base || '/'}>Home</a></li>
              <li><a href={`${base}/services`}>Our Services</a></li>
              <li><a href={`${base}/about`}>About Us</a></li>
              <li><a href={`${base}/contact`}>Contact</a></li>
              <li><a href={`${base}/#quote`}>Request a Proposal</a></li>
            </ul>
          </nav>
          <div>
            <h2 className={styles.footerHeading}>Contact us</h2>
            <p className={styles.footerLead}>We’re here to help.</p>
            <dl className={styles.footerContact}>
              <div>
                <dt>Our address</dt>
                <dd>
                  <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
                    {ADDRESS[0]}
                    <br />
                    {ADDRESS[1]}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Telephone</dt>
                <dd>
                  <a href={`tel:${PHONE.replace(/-/g, '')}`}>Tel. {PHONE}</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className={styles.footerBar}>
        <div className={`${styles.wrap} ${styles.footerBarInner}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- static client asset */}
          <img src={LOGO_HORIZONTAL} alt="Regency Parking Services" width={180} height={60} />
          <p>© {new Date().getFullYear()} Regency Parking Services LLC · Houston, Texas</p>
        </div>
      </div>

      <a href="#top" className={styles.toTop} aria-label="Back to top">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 15 6-6 6 6" />
        </svg>
      </a>
    </footer>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { CLIENTS } from './site';
import styles from './clients.module.css';

const INTERVAL_MS = 6000;

/**
 * One full-width client card, logo left and description right, rotating
 * through CLIENTS on a timer. Pauses on hover and while anything inside has
 * focus; no autoplay under reduced motion. Dots jump straight to a client.
 */
export default function ClientCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = CLIENTS.length;

  useEffect(() => {
    if (paused || count < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <div
      className={styles.carousel}
      data-paused={paused || undefined}
      aria-roledescription="carousel"
      aria-label="Our clients"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.slides}>
        {CLIENTS.map((c, i) => (
          <article
            key={c.name}
            className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${c.name}`}
            aria-hidden={i !== active}
          >
            <div className={styles.slideLogo}>
              {/* eslint-disable-next-line @next/next/no-img-element -- static client logo */}
              <img src={c.logo} alt="" width={c.logoW} height={c.logoH} loading="lazy" />
            </div>
            <div className={styles.slideBody}>
              <p className={styles.sector}>{c.sector}</p>
              <h3>{c.name}</h3>
              <p>{c.body}</p>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visit}
                tabIndex={i === active ? 0 : -1}
              >
                Visit website
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
                <span className={styles.srOnly}>(opens in a new tab)</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.controls}>
        {CLIENTS.map((c, i) => (
          <button
            key={c.name}
            type="button"
            aria-label={`Show ${c.name}`}
            aria-current={i === active}
            className={i === active ? styles.dotActive : undefined}
            onClick={() => setActive(i)}
          >
            {/* The active dot fills over the interval; the key restarts it whenever the timer restarts. */}
            <span key={i === active ? `on-${active}-${paused}` : 'off'} />
          </button>
        ))}
      </div>
    </div>
  );
}

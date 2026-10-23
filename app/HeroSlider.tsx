'use client';

import { useEffect, useState } from 'react';
import QuickRequestCard from './QuickRequestCard';
import VideoButton from './VideoButton';
import styles from './page.module.css';

export type Slide = { title: string; body: string; image: string };
export type Highlight = { title: string; detail: string; icon: 'years' | 'hotel' | 'shield' | 'pin' };

const HIGHLIGHT_ICONS: Record<Highlight['icon'], React.ReactNode> = {
  years: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M8 14h2M14 14h2M8 17.5h2" />
    </>
  ),
  hotel: (
    <>
      <path d="M5 21V4h9v17M14 9h5v12M3 21h18" />
      <path d="M8 7.5h3M8 11h3M8 14.5h3M16.5 12.5v1M16.5 16v1M8.5 21v-3h2v3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
};

const INTERVAL_MS = 6500;

/**
 * Hero: the photos crossfade behind a fixed two-column layout — slide copy on
 * the left, the Quick Request card on the right. The copy blocks share
 * one grid cell so the column never changes height between slides. Autoplay
 * stops on hover, while anything inside (e.g. the form) has focus, and under
 * reduced motion.
 */
export default function HeroSlider({
  slides,
  highlights,
  mobileIntro,
}: {
  slides: Slide[];
  highlights: Highlight[];
  mobileIntro: { title: string; body: string };
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  return (
    <section
      id="home"
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Regency Parking Services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`${styles.heroBg} ${i === active ? styles.heroBgActive : ''}`}
          style={{ backgroundImage: `url(${s.image})` }}
          aria-hidden="true"
        />
      ))}

      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Houston valet &amp; parking management</p>
          {/* Only one of these is displayed at a time (CSS), so only one h1 is exposed. */}
          <div className={styles.heroIntro}>
            <h1 className={styles.heroTitle}>{mobileIntro.title}</h1>
            <p className={styles.heroBody}>{mobileIntro.body}</p>
          </div>
          <div className={styles.heroStack}>
            {slides.map((s, i) => (
              <div
                key={s.title}
                className={`${styles.heroText} ${i === active ? styles.heroTextActive : ''}`}
                aria-hidden={i !== active}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
              >
                <h1 className={styles.heroTitle}>{s.title}</h1>
                <p className={styles.heroBody}>{s.body}</p>
              </div>
            ))}
          </div>
          <div className={styles.heroCtas}>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#service">
              Our Services
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={styles.btnArrow}>
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
            <VideoButton videoId="834136562" label="Watch our video" />
          </div>
        </div>

        <QuickRequestCard />
      </div>

      <div className={styles.wrap}>
        <div className={styles.heroStrip}>
          <ul className={styles.highlights}>
            {highlights.map((h) => (
              <li key={h.title}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {HIGHLIGHT_ICONS[h.icon]}
                </svg>
                <span>
                  <strong>{h.title}</strong>
                  <small>{h.detail}</small>
                </span>
              </li>
            ))}
          </ul>
            <div className={styles.heroDots}>
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-label={`Show slide ${i + 1}: ${s.title}`}
                  aria-current={i === active}
                  className={i === active ? styles.heroDotActive : undefined}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}

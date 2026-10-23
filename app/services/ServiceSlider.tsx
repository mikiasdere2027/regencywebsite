'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import base from '../page.module.css';
import styles from './services.module.css';

export type SliderService = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  body: string;
  points: string[];
  cta: string;
  image: string;
  focus?: string;
};

/**
 * All six services in one section: tabs + prev/next over a single panel that
 * crossfades between them. The overview cards link to #<service-id>; a matching
 * hash selects that slide and scrolls here, on load and on every hashchange.
 * Swipe works on touch, arrow keys on the tab list. No autoplay: this is copy
 * people read.
 */
export default function ServiceSlider({ services, ctaHref }: { services: SliderService[]; ctaHref: string }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeX = useRef<number | null>(null);
  const count = services.length;

  const go = useCallback((i: number) => setActive(((i % count) + count) % count), [count]);
  // Relative moves read the latest index, so quick repeated clicks all count.
  const step = useCallback((d: number) => setActive((a) => (a + d + count) % count), [count]);

  useEffect(() => {
    const fromHash = () => {
      const i = services.findIndex((s) => `#${s.id}` === window.location.hash);
      if (i < 0) return;
      setActive(i);
      root.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [services]);

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + count) % count;
    go(next);
    tabs.current[next]?.focus();
  }

  function onPointerDown(e: PointerEvent) {
    if (e.pointerType === 'touch') swipeX.current = e.clientX;
  }
  function onPointerUp(e: PointerEvent) {
    if (swipeX.current === null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div ref={root} className={styles.slider} aria-roledescription="carousel" aria-label="Our services in detail">
      <div className={styles.sliderHead}>
        <div className={styles.sliderTabs} role="tablist" aria-label="Services" onKeyDown={onTabKey}>
          {services.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${s.id}`}
              tabIndex={i === active ? 0 : -1}
              className={i === active ? styles.sliderTabActive : undefined}
              onClick={() => go(i)}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className={styles.sliderNav}>
          <span className={styles.sliderCount} aria-live="polite">
            <strong>{pad(active + 1)}</strong> / {pad(count)}
          </span>
          <button type="button" aria-label="Previous service" onClick={() => step(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5m6-6-6 6 6 6" />
            </svg>
          </button>
          <button type="button" aria-label="Next service" onClick={() => step(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.sliderStage} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        {services.map((s, i) => (
          <article
            key={s.id}
            id={`panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${s.id}`}
            aria-hidden={i !== active}
            className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
          >
            <div className={styles.slideMedia}>
              {/* eslint-disable-next-line @next/next/no-img-element -- static client asset */}
              <img src={s.image} alt="" loading="lazy" style={s.focus ? { objectPosition: s.focus } : undefined} />
            </div>
            <div className={styles.slideBody}>
              <span className={styles.num}>{pad(i + 1)}</span>
              <h3>{s.title}</h3>
              <p className={styles.tagline}>{s.tagline}</p>
              <p>{s.body}</p>
              <ul className={styles.checks}>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <a
                className={`${base.btn} ${base.btnGhost} ${styles.btnOutline}`}
                href={ctaHref}
                tabIndex={i === active ? 0 : -1}
              >
                {s.cta}
                <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.arrow}>
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.sliderBar} aria-hidden="true">
        <span style={{ width: `${((active + 1) / count) * 100}%` }} />
      </div>
    </div>
  );
}

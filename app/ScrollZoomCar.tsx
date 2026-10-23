'use client';

import { useEffect, useRef } from 'react';
import styles from './page.module.css';

const MIN = 0.7;
const MAX = 1.15;

/**
 * The car between the philosophy columns: it grows as it scrolls toward the
 * middle of the screen and shrinks again as it leaves. Progress goes into a
 * CSS variable so the browser does the transform; nothing re-renders. Held at
 * full size for reduced motion.
 */
export default function ScrollZoomCar({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the car's centre is at the screen centre, 1 at either edge.
      const off = Math.min(1, Math.abs(r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2));
      const eased = 1 - off * off;
      el.style.setProperty('--zoom', (MIN + (MAX - MIN) * eased).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={styles.zoomCar} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- static asset, scaled by CSS */}
      <img src={src} alt="" width={400} height={277} className={styles.carArt} />
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

/**
 * Play button that opens the promo video in a modal. The Vimeo iframe only
 * exists while the modal is open, so the page loads nothing from Vimeo until
 * someone asks for the video, and closing it stops playback.
 */
export default function VideoButton({ videoId, label }: { videoId: string; label: string }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <button type="button" className={styles.playBtn} onClick={() => setOpen(true)}>
        <span className={styles.playIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
        {label}
      </button>

      <dialog
        ref={dialog}
        className={styles.videoModal}
        aria-label={label}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // A click on the backdrop lands on the dialog itself.
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <button type="button" className={styles.videoClose} aria-label="Close video" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        {open && (
          <div className={styles.videoFrame}>
            <iframe
              src={`https://player.vimeo.com/video/${videoId}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`}
              title={label}
              allow="autoplay; fullscreen; picture-in-picture"
            />
          </div>
        )}
      </dialog>
    </>
  );
}

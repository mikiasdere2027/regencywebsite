import type { ReactNode } from 'react';
import styles from './page.module.css';

export type ServiceIconName = 'hotel' | 'event' | 'hospital' | 'corporate' | 'condo' | 'shuttle';

/** Thin-line icon for each of Regency's six services. */
export default function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const paths: Record<ServiceIconName, ReactNode> = {
    hotel: (
      <>
        <path d="M5 21V7h14v14M3 21h18M10 21v-3h4v3" />
        <path d="M8 10h1M11.5 10h1M15 10h1M8 13.5h1M11.5 13.5h1M15 13.5h1M9 3.5l.4.9M12 3v1M15 3.5l-.4.9" />
      </>
    ),
    event: (
      <>
        <path d="M6 3h4l-.3 4a2 2 0 0 1-3.4 0zM8 9v9M6 18h4M14 3h4l.3 4a2 2 0 0 1-3.4 0zM16 9v9M14 18h4" />
        <path d="M10 4.5l4-1" />
      </>
    ),
    hospital: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 7.5h4v2.5h2.5v4H14v2.5h-4V14H7.5v-4H10z" />
      </>
    ),
    corporate: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
      </>
    ),
    condo: (
      <>
        <path d="M6 21V3h8v18M14 9h4v12" />
        <path d="M2 21h20M9 7h2M9 11h2M9 15h2" />
      </>
    ),
    shuttle: (
      <>
        <path d="M4 17v-5l2-5h12l2 5v5z" />
        <path d="M4 12h16M6 17v2.5M18 17v2.5M9 15h6" />
        <circle cx="7.5" cy="14.5" r=".6" />
        <circle cx="16.5" cy="14.5" r=".6" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className ?? styles.icon}>
      {paths[name]}
    </svg>
  );
}

'use client';

import { useState, type FormEvent } from 'react';
import styles from './page.module.css';

type Plan = 'hourly' | 'monthly';

/**
 * Hero booking card: pick hourly or monthly, search a location, find parking.
 * Mockup only — a search shows a preview notice instead of results.
 */
export default function ParkingSearchCard() {
  const [plan, setPlan] = useState<Plan>('hourly');
  const [searched, setSearched] = useState('');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('location');
    setSearched(String(q ?? '').trim());
  }

  return (
    <div className={styles.quickCard}>
      <h2>Find Parking</h2>
      <p>Reserve a spot at a Regency-managed location, by the hour or by the month.</p>

      {searched ? (
        <div className={styles.formSent} role="status">
          <h3>Searching {plan} parking near “{searched}”.</h3>
          <p>This is a design preview, so no results load here. On the live site this shows available spots and rates.</p>
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setSearched('')}>
            New search
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className={styles.planToggle} role="radiogroup" aria-label="Parking plan">
            {(['hourly', 'monthly'] as const).map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={plan === p}
                className={plan === p ? styles.planActive : undefined}
                onClick={() => setPlan(p)}
              >
                {p === 'hourly' ? 'Hourly' : 'Monthly'}
              </button>
            ))}
          </div>

          <label htmlFor="rg-park-location" className={styles.searchLabel}>
            Location
          </label>
          <div className={styles.searchField}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m20 20-4.2-4.2" />
            </svg>
            <input
              id="rg-park-location"
              name="location"
              type="search"
              placeholder="Enter location"
              autoComplete="off"
              required
            />
          </div>

          <button type="submit" className={`${styles.btn} ${styles.btnBlock} ${styles.findBtn}`}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m20 20-4.2-4.2" />
            </svg>
            Find Parking
          </button>
        </form>
      )}

      <p className={styles.quickNote}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5M12 16.5v.5" />
        </svg>
        Free cancellation up to 30 mins before
      </p>
    </div>
  );
}

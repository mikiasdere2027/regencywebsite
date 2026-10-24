/** Shared constants for the Regency Parking Services site. */
export const BASE = '';
/** The live site. Canonicals and the sitemap point here. */
export const REGENCY_ORIGIN = 'https://www.regencyparkingservice.com';
export const IMG = '/images/clients/regency';
export const LOGO_HORIZONTAL = '/Regency_Logo_horizontal.svg';
export const LOGO_EMAIL = '/Regency_Logo_horizontal.png';
export const LOGO_ICON = '/Regency_Logo_icon.svg';
export const PHONE = '713-478-1104';
/** The six services, as named in forms and lists. */
export const SERVICE_NAMES = [
  'Hotels',
  'Private Events',
  'Hospitals',
  'Corporate Events',
  'High-Rise Condos',
  'Transportation',
] as const;
export const ADDRESS = ['6065 Hillcroft St. Suite #612 D', 'Houston, TX 77081'];
export const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=6065+Hillcroft+St+Suite+612+D+Houston+TX+77081';

/**
 * Not on Regency's current site, so not invented here. Fill these in once
 * Regency confirms them; until then the contact cards point to the form and
 * the phone instead.
 */
export const EMAIL = '';
export const HOURS = '';

/**
 * Current Regency clients, as named by Regency. Logos are the clients' own,
 * fetched from their official sites into public/images/clients/regency/clients.
 */
export const CLIENTS = [
  {
    name: 'The Post Oak Hotel',
    sector: 'Luxury hospitality',
    body: 'Professional parking and valet service supporting the guest experience at one of Houston’s luxury hospitality destinations.',
    logo: `${IMG}/clients/post-oak-hotel.png`,
    logoW: 600,
    logoH: 309,
    url: 'https://www.thepostoakhotel.com/',
  },
  {
    name: 'University of Houston',
    sector: 'Education & campus',
    body: 'Parking services supporting one of Houston’s major educational institutions and its campus community.',
    logo: `${IMG}/clients/university-of-houston.png`,
    logoW: 613,
    logoH: 128,
    url: 'https://www.uh.edu/',
  },
] as const;

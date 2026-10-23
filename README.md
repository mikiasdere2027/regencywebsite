# Regency Valet Parking Services

This is the standalone Next.js site for [regencyparkingservice.com](https://regencyparkingservice.com). Its pages, enquiry endpoint, images, deployment files, and dependencies live in this folder independently of the REM Assistance Service app.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

The development server listens on port 3001. The site uses a local system-font fallback so startup does not need Google Fonts access. The enquiry endpoint logs submissions locally when `AUTH_RESEND_KEY` is unset. Add the Resend key and verified sender address to `.env.local` to deliver email.

## Build and run

```bash
npm run build
npm start
```

The build stages a complete Next.js standalone bundle at `.next/standalone`, including the site's public images and static assets. `PORT` and `HOSTNAME` can be set in the environment; the deployment defaults are port 3001 and `127.0.0.1`.

## Deployment

The files in `deploy/` configure a separate `regency` systemd service and Nginx virtual host. Deploy the built standalone bundle to `/srv/regency/current`, create `/srv/regency/shared/.env` from `.env.example`, then run `deploy/setup-regency.sh stage1`. After DNS points to the server, run `stage2` to enable HTTPS.

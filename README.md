# Project Site 1

Launch-oriented math and physics worksheet generator with:

- public landing pages for each main subject
- a live worksheet generator at `/app`
- server-side LaTeX PDF export
- dynamic `robots.txt`, `sitemap.xml`, `site.webmanifest`, and `ads.txt`
- optional Google Analytics and AdSense hooks through environment variables

## Main routes

- `/`
- `/app`
- `/calculus-i`
- `/calculus-ii`
- `/linear-algebra`
- `/statistics`
- `/physics-i`
- `/physics-ii`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms`
- `/advertise`

## Environment variables

Copy `.env.example` and set the values on your host:

- `SITE_NAME`
- `SITE_LABEL`
- `SITE_URL`
- `CONTACT_EMAIL`
- `GOOGLE_ANALYTICS_ID`
- `GOOGLE_SITE_VERIFICATION`
- `ADSENSE_CLIENT_ID`
- `ADSENSE_PUBLISHER_ID`
- `OG_IMAGE_PATH`

## Before a real launch

1. Replace the placeholder email.
2. Set the final domain in `SITE_URL`.
3. Add analytics only after you are ready to measure traffic.
4. Add AdSense values only when approved.
5. Review the legal pages and update them to match your real setup.

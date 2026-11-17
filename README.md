# VASEOUS GLOBAL

A premium storefront and CRM platform for a China-to-Nigeria sourcing and custom-order business. The app combines a luxury ecommerce front end with a protected admin dashboard for managing customers, leads, orders, and subscribers.

## Overview

- Public storefront with homepage, category pages, about, contact, and privacy sections
- Custom-price sourcing model without fixed product pricing
- Enquiry form and newsletter signup connected to Supabase
- Protected admin portal for dashboard management and CRM workflows
- Responsive layout for mobile and desktop browsing

## Stack

- React + Vite
- React Router
- Supabase JavaScript client
- Lucide React icons

## Project structure

- src/pages/public — public storefront screens
- src/pages/admin — protected admin dashboard views
- src/context — auth and app state
- src/lib — Supabase and data-layer helpers
- src/config — business catalog and branding config
- supabase/schema.sql — database schema and policies
- public/images — local product visuals

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a local environment file from [.env.example](.env.example):
   ```bash
   copy .env.example .env
   ```
3. Add your live Supabase values:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. Start the app:
   ```bash
   npm run dev
   ```
5. Open the local site at:
   - http://localhost:5173

## Production build

```bash
npm run build
```

## Supabase guidance

The project expects your Supabase project to include the schema and public table policies defined in [supabase/schema.sql](supabase/schema.sql). The public enquiry and subscriber forms are designed to write anonymously, while the admin dashboard uses authenticated Supabase access.

## Notes

- Product and category visuals live in [public/images](public/images)
- Brand and catalog content are managed in [src/config/businessConfig.js](src/config/businessConfig.js)
- Styling and responsiveness are handled in [src/styles/global.css](src/styles/global.css)

## Handoff status

The project is currently set up for a live storefront + admin CRM workflow with working Supabase connectivity and a committed GitHub remote.

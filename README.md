# Calorais landing page

React, TypeScript, Vite and Vercel serverless functions power the Calorais landing page.

## Local setup

1. Install dependencies with `npm ci`.
2. Copy `.env.example` to `.env.local`.
3. Fill in the required server-only Supabase variables locally.
4. Run the project with Vercel's local development environment so both the page and `/api` functions are available.

Never commit `.env`, `.env.local`, private keys, service-role keys or deployment credentials.

## Vercel deployment

Configure these required environment variables in the Vercel project settings:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY` (required for the waitlist welcome email)

The database wake/restore hook is disabled unless both optional variables below are configured:

- `FULLSTACK_PROJECT_REF`
- `FULLSTACK_RESTORE_API_URL`

Do not place secret values in `vercel.json`; that file is committed to source control.

If a credential has ever appeared in a shared file, ZIP, commit or deployment configuration, rotate it in the provider dashboard before deploying this copy.

## Checks

- `npm run lint`
- `npm run build`
- `npm audit`

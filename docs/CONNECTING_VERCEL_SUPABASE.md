How to connect this repository to Vercel and Supabase

This document scaffolds CI workflows and shows the minimum secrets and steps required to connect the repo to Vercel (for frontend hosting) and Supabase (for database and auth).

1) Vercel
- Create a Vercel account (vercel.com) and import the GitHub repository (betteleym-dev/fisher-freelancing). When prompted, select the root of the repo and the Project Settings.
- Note the Project ID and Org ID in the Vercel project settings → General. You will need to add those as GitHub Secrets.
- In the repository Settings → Secrets → Actions, create these secrets:
  - VERCEL_TOKEN — personal token from Vercel (User Settings → Tokens)
  - VERCEL_ORG_ID — your Vercel organization ID
  - VERCEL_PROJECT_ID — the project ID for this repo in Vercel
- The workflow `.github/workflows/deploy-vercel.yml` will build the monorepo and deploy `artifacts/fisher-first` as the Vercel project.

2) Supabase
- Create a Supabase project (app.supabase.com). After creation, copy these values from the project settings:
  - SUPABASE_URL (the REST/GraphQL endpoint)
  - SUPABASE_ANON_KEY (client-side key)
  - SUPABASE_SERVICE_ROLE_KEY (server-side privileged key)
  - SUPABASE_PROJECT_REF (the project ref id shown in the URL)
- Add these to GitHub Secrets (Settings → Secrets → Actions):
  - SUPABASE_URL
  - SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
  - SUPABASE_PROJECT_REF
- The workflow `.github/workflows/supabase-migrations.yml` will install the Supabase CLI and run `supabase db push` against the configured project ref. This assumes you keep migrations under `supabase/migrations` or use `supabase` conventions.

3) Local development
- Create a local `.env` (not committed) with the following keys filled:
  - SUPABASE_URL=your-supabase-url
  - SUPABASE_ANON_KEY=your-anon-key
  - SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  - ALLOWED_ORIGINS=http://localhost:5173
- Run the API server (artifacts/api-server) and the frontend (artifacts/fisher-first) as documented in the repo.

4) Notes & Security
- Never commit service role keys to source control. Always use GitHub Secrets for CI.
- For production, lock ALLOWED_ORIGINS to your production domain(s).
- Test migrations in a staging Supabase project before running in production.

If you want, I can:
- Create the infra/integrations branch and add these workflows (already done in `infra/integrations`).
- Walk through the Vercel import steps interactively and help you set the required GitHub Secrets.
- Create a small Supabase schema and example migration files in `supabase/`.

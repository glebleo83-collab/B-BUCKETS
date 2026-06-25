# B-BUCKETS — Setup & Go-Live Checklist

This is your step-by-step list for getting accounts and putting the site online.
Some steps cost money or need an email/credit card — **do these with a parent.**
Nothing here is urgent; the site already runs on your computer with `npm run dev`.

---

## ✅ Already done (in this session)

- [x] Astro project scaffolded (Astro 7 + Tailwind 4 + React + shadcn base)
- [x] Sanity client wired up (`src/lib/sanity.ts`)
- [x] "Coming Soon" placeholder page, building cleanly
- [x] Sanity Studio with **Product** and **Drop** schemas (`studio/`)
- [x] Existing brand images organized into `public/img/`
- [x] Git initialized locally with a first commit

---

## 1. Sanity (free — make the CMS real)

1. Go to **sanity.io** and sign up (free Growth plan is plenty).
2. Create a new project named **B-BUCKETS**, dataset **production**.
3. Copy the **Project ID** it gives you.
4. In this project, create the env files and paste the id:
   - `.env` → `PUBLIC_SANITY_PROJECT_ID=...`
   - `studio/.env` → `SANITY_STUDIO_PROJECT_ID=...`
5. Test the Studio locally:
   ```bash
   cd studio
   npm run dev      # opens http://localhost:3333 — try adding a test product
   ```
6. Put the Studio online (free):
   ```bash
   cd studio
   npx sanity login
   npm run deploy   # → https://b-buckets.sanity.studio
   ```

## 2. GitHub (free — store the code online)

1. Sign up at **github.com**.
2. Create a new **empty** repository named `b-buckets` (no README — we have one).
3. Connect this folder to it (replace YOUR-USERNAME):
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/b-buckets.git
   git branch -M main
   git push -u origin main
   ```

## 3. Cloudflare Pages (free hosting — put the site online)

1. Sign up at **cloudflare.com**.
2. **Workers & Pages → Create → Pages → Connect to Git**, pick the `b-buckets` repo.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Add environment variables (same as your `.env`):
   - `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SANITY_API_VERSION`
5. Deploy → you get a live URL: **b-buckets.pages.dev**

From now on, every `git push` to `main` auto-deploys. 🎉

## 4. Domain (costs money — do with a parent)

1. In Cloudflare → **Registrar**, buy **b-buckets.com**.
2. In your Pages project → **Custom domains** → add `b-buckets.com`.

---

## Later sessions (not yet built)

- [ ] Email waitlist: Cloudflare Worker at `/api/waitlist` + D1 database
      (this is when we switch on the Cloudflare adapter)
- [ ] Real branded homepage (hero, copy, colors) — you give the creative direction
- [ ] Shop / product grid pulling from Sanity
- [ ] Lookbook

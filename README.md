# B-BUCKETS

The B-BUCKETS storefront — built with Astro, Tailwind, React islands, and Sanity.

## Tech stack

| Part            | Tool                                            |
| --------------- | ----------------------------------------------- |
| Framework       | Astro 7 (React islands)                         |
| Styling         | Tailwind CSS 4 + shadcn/ui                       |
| Animation       | Motion                                          |
| CMS             | Sanity (Studio in `/studio`)                    |
| Hosting         | Cloudflare Pages                                 |
| Waitlist (todo) | Cloudflare Workers + D1                          |

## Project layout

```
.
├── astro.config.mjs        # Astro + Tailwind(Vite) + React
├── src/
│   ├── pages/index.astro    # the "coming soon" page
│   ├── layouts/Layout.astro # shared HTML shell
│   ├── components/          # React islands (e.g. ComingSoon.tsx)
│   │   └── ui/              # shadcn components land here
│   ├── lib/
│   │   ├── sanity.ts        # Sanity client
│   │   └── utils.ts         # cn() class helper
│   └── styles/global.css    # Tailwind + theme tokens
├── public/img/              # all images, organized by section
│   ├── brand/  hero/  products/  lookbook/  _source/
└── studio/                  # Sanity Studio (deploys separately)
    └── schemaTypes/         # product.ts, drop.ts
```

## Commands

Website (run from the project root):

```bash
npm run dev      # local dev server at http://localhost:4321
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
npm run format   # prettier
npm run lint     # eslint
```

Sanity Studio (run from `studio/`):

```bash
cd studio
npm run dev      # local Studio at http://localhost:3333
npm run deploy   # publish to https://b-buckets.sanity.studio
```

## Environment variables

Copy the example files and fill in real values once you have a Sanity project:

```bash
cp .env.example .env                 # website
cp studio/.env.example studio/.env   # studio
```

See `SETUP.md` for the full step-by-step account + deploy checklist.

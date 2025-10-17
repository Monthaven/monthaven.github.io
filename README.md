# Monthaven — Capital Advisory & Deal-Intelligence

This repository contains the Next.js implementation of Monthaven&apos;s capital advisory and deal-intelligence site. The experience adopts a boxed/card layout, highlights the NCNDA-first process, and publishes Intel briefs via MDX content files.

## Monorepo structure

```
/
├── apps/
│   └── web/                    # Next.js 14 App Router site
│       ├── app/                # Routes (Home, Why, Services, How, Intel, Team, Contact, Legal, etc.)
│       ├── components/         # Box system, CTA, Header, Footer, KPI, tables, etc.
│       ├── content/            # MDX Intel briefs & case studies
│       ├── lib/                # Analytics stubs, SEO helpers
│       ├── theme/              # Design tokens
│       ├── tailwind.config.ts  # Tailwind configuration with brand palette
│       └── package.json        # Workspace package definition
├── .github/workflows/ci.yml    # Build, lint, typecheck, Lighthouse CI
├── package.json                # npm workspace config
└── README.md
```

## Getting started

> **Note:** Installing dependencies requires external network access to npm. If the environment blocks outbound requests you may need to configure a proxy or install packages locally before running the commands below.

```bash
npm install              # Installs workspace dependencies
npm run dev --workspaces # Starts the web app in development mode
```

The web application is available at `http://localhost:3000` by default. Tailwind CSS, TypeScript, and MDX content are all preconfigured.

## Available scripts

From the repository root you can run the standard scripts against the web workspace:

```bash
npm run lint        # next lint
npm run typecheck   # tsc --noEmit
npm run build       # next build
```

## Content & compliance notes

- Intel briefs live in `apps/web/content` as MDX files. Each entry exports metadata and uses boxed components for Summary, Methodology, etc.
- KPI and mandate metrics on the Home page include supporting footnotes and date ranges.
- The NCNDA process is emphasized as step two on the How We Work page and via dedicated comparison tables.
- Disclosure and contact details surface in both the header and footer, along with client login and request-access CTAs.

## Deployment

The CI workflow (`web-ci`) installs dependencies, lints, typechecks, builds the Next.js app, and runs Lighthouse CI in warning mode. Deploy using your preferred hosting platform for Next.js (Vercel, Netlify, etc.) or export a static build if applicable.

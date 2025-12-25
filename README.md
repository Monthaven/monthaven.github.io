# Monthaven Capital Website

Static site for Monthaven Capital LLC deployed via GitHub Pages (with Netlify-style redirects for friendly URLs). The site leans into a clean, capital-markets look with SMS compliance built in.

## Project structure (key routes)

- `index.html` — Home
- `why.html`, `services.html`, `how.html`, `intel.html`, `team.html` — Core positioning
- `contact/index.html` — Request access/intake
- `submit-a-deal/index.html` — Deal submission intake
- `text/index.html` — SMS opt-in (A2P consent language)
- `privacy/index.html`, `terms/index.html` — Canonical policies (Dec 24, 2025)
- `legal/accessibility/`, `legal/sms/` — Accessibility and SMS terms (legacy `/legal/privacy` and `/legal/terms` now redirect to `/privacy` and `/terms`)
- `assets/` — Brand assets
- `theme.css`, `styles.css` — Tokens and layout
- `scripts.js` — Shared JS (nav toggle, form handling, SMS consent toggle)
- `_redirects` — Friendly aliases (GitHub Pages/Netlify compatible)

## Local development

No build step. Open `index.html` directly, or run a lightweight server such as:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. Edit HTML/CSS/JS and refresh.

## Deployment workflow

`.github/workflows/static.yml` publishes `main` to GitHub Pages. Keep `CNAME` updated if using a custom domain. `_redirects` provides 301s for legacy paths (e.g., `/legal/privacy` → `/privacy`, `/contacts` → `/contact`).

## Compliance + forms

- Global footer shows entity, address (32 N Gould St, Sheridan, WY), email, phone, and Privacy/Terms links.
- SMS consent: `scripts.js` shows a required checkbox when a phone number is entered; consent text aligns with A2P requirements.
- Text Updates page includes the full opt-in disclosure above the submit button.
- Privacy/Terms updated to December 24, 2025 language.

## Asset guidelines

- Prefer SVG for logos/icons; keep binaries small and CDN-host large media.
- Favicon/social cards live in `assets/`; update references if you swap imagery.

## QA checklist

See `docs/pr-checklist.md` for quick regression checks before shipping.

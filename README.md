# Monthaven Capital Website

This repository hosts the static site for Monthaven Capital and is configured to deploy automatically to GitHub Pages. The goal is to provide a clean, well-documented starting point that we can iterate on as new designs and content from Checkover come together.

## Project structure

```
/
├── index.html        # Home (advisory positioning)
├── why.html          # Why Monthaven overview
├── services.html     # Advisory service lanes
├── how.html          # Mandate process & NCNDA stepper
├── intel.html        # Briefs, playbooks, and case studies
├── team.html         # Leadership bios
├── contact.html      # Request access / intake form
├── legal/            # Terms, privacy, accessibility, SMS terms
├── theme.css         # Design tokens (palette, typography)
├── styles.css        # Global layout, “boxes” system, utilities
├── scripts.js        # Navigation toggle + shared enhancements
├── assets/           # Images, icons, and other static assets
└── .github/workflows # GitHub Pages deployment workflow
```

## Local development

Because the site is a static HTML/CSS experience there is no build step required.

1. Open `index.html` directly in your browser, or
2. Run a simple development server (for example `python -m http.server 8000`) and navigate to `http://localhost:8000`.

Update the HTML, CSS, or JS files, refresh the browser, and you will see your changes immediately.

## Deployment workflow

The repository includes a GitHub Actions workflow (`.github/workflows/static.yml`) that publishes the contents of the `main` branch to GitHub Pages automatically. Pushes to `main` will trigger a deployment without any additional configuration.

If you use a custom domain, keep the `CNAME` file at the repository root updated with the desired hostname so GitHub Pages can provision TLS certificates correctly.

## Asset guidelines

- Store icons and illustrations as SVG when possible so they remain editable and friendly for code review.
- If you need a raster favicon or screenshot, convert it to a data URI (Base64) and inline it in the page rather than committing the binary asset directly.
- Larger binaries (videos, photography, etc.) should live in an external CDN or object store and be referenced via absolute URLs.

## Next steps

- Replace placeholder copy with approved messaging and data.
- Drop in real imagery or charts inside the `assets/` directory and update references in `index.html`.
- Layer on components or JavaScript enhancements as new functionality is defined.

Feel free to open issues or pull requests as we expand the site alongside the Checkover design work.

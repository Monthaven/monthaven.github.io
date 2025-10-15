# Monthaven Capital — GitHub Pages Starter

This is a clean, static starter you can deploy to **GitHub Pages** under a subdomain like `docs.monthavencapital.com` while keeping your Squarespace site on the root (`monthavencapital.com`).

## Quick deploy
1) **Create a new GitHub repo** (e.g., `monthaven-site`) and set the default branch to `main`.
2) Upload these files or push via git.
3) In the repo, go to **Settings → Pages** and ensure the source is set to **GitHub Actions** (the included workflow deploys automatically on every push to `main`).  
4) (Optional) **Custom domain**: Decide your subdomain, e.g., `docs.monthavencapital.com`.
   - Add a file named `CNAME` at the repo root containing that exact domain.
   - In **Squarespace → Settings → Domains → monthavencapital.com → DNS settings**, add a **CNAME**:
     - **Host/Name:** `docs`
     - **Value/Target:** `<your-github-username>.github.io.`  (note the trailing dot is okay but not required)
   - In GitHub **Settings → Pages**, set the Custom Domain to the same `docs.monthavencapital.com`. Enable **Enforce HTTPS** once the certificate is issued.
5) Edit `index.html` content (Team, Strategy, etc.) as you like and push.

### Notes
- If you ever want the **root** domain (`monthavencapital.com`) to point to GitHub Pages (migrating off Squarespace), you’d set A records to the GitHub Pages IPs and optionally a `www` CNAME to `<username>.github.io.`. Subdomain routing (recommended while keeping Squarespace) uses only the CNAME step above.
- This starter is fully static (HTML/CSS). You can later switch to a framework (Next.js/Vite) and still deploy via GitHub Pages or Vercel.

## Local dev
Open `index.html` in a browser. No build step required.

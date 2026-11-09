# SAANVIKA TECHNOLOGIES — Website

**Reliable Tech. Clear Solutions.**
Official website for SAANVIKA TECHNOLOGIES, a computer repair, computer services and IT support business in Madhurawada, Visakhapatnam, Andhra Pradesh.

- **Live site:** https://www.saanvikatechnologies.com/ (GitHub Pages, custom domain; DNS at GoDaddy)
- **Google Maps listing:** https://maps.app.goo.gl/uBvAg1Kp8fdG1vbHA

---

## What's inside

| Path | Purpose |
|---|---|
| `index.html` | The single-page website (all sections, SEO meta tags, LocalBusiness structured data) |
| `404.html` | Branded "page not found" page |
| `assets/css/styles.css` | All styling. Brand colours are defined as variables at the top. |
| `assets/js/config.js` | **The owner-editable file:** contact details, services and common problems |
| `assets/js/main.js` | Menu, WhatsApp links, service/problem cards, enquiry form |
| `assets/brand/` | Logo SVGs: primary, white, monogram (colour/white), favicon |
| `assets/img/` | PNG icons and the social share image (`og-image.png`) |
| `docs/` | Owner checklist, brand guide, brand sheet and image sources (not deployed) |
| `.github/workflows/pages.yml` | Deploys the site to GitHub Pages on every push to `main` |

There is no build step and no dependencies. The site is plain HTML, CSS and JavaScript.

## Editing content

Most changes only need **`assets/js/config.js`**:

- **Publish a new service:** find it in `services` and change `enabled: false` to `enabled: true`. Only do this once the owner confirms the business offers it.
- **Add email / business hours:** fill in `contact.email` / `contact.hours` and set `enabled: true`. They then appear in the Contact section.
- **Change the phone / WhatsApp number:** edit `contact.phone` and `contact.whatsapp`. The number also appears as text in `index.html`. Search for `88863` and update every match, including the JSON-LD block and the meta description.

See **[docs/OWNER-CHECKLIST.md](docs/OWNER-CHECKLIST.md)** for everything that still needs the owner's confirmation.

## Preview locally

You don't need Node or Python. From the repo root in PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .claude/serve.ps1 -Port 8080
```

Then open http://localhost:8080/. Opening `index.html` directly also works for most things.

## Deployment (GitHub Pages)

1. Push to `main`.
2. **One-time setup:** in the GitHub repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. The *Deploy to GitHub Pages* workflow publishes the site in about a minute. Progress shows under the **Actions** tab.

Only the public files are deployed (`index.html`, `404.html`, `assets/`, `robots.txt`, `sitemap.xml`, `site.webmanifest`). The `docs/` folder stays in the repo only.

### Custom domain (www.saanvikatechnologies.com)

The custom domain is set under **Settings → Pages → Custom domain**. The DNS records are managed at GoDaddy:

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `saanvikatechnologies.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

No other A records (such as GoDaddy's "Parked" record) or domain forwarding should exist for `@`. Once DNS resolves, tick **Enforce HTTPS** in the Pages settings.

The site's canonical URL is `https://www.saanvikatechnologies.com/`. It is used in `index.html` (canonical, Open Graph, JSON-LD), `sitemap.xml` and `robots.txt`.

## Regenerating PNG images

The PNGs are rendered from HTML sources in `docs/social/` using Microsoft Edge:

```powershell
powershell -ExecutionPolicy Bypass -File docs/render-images.ps1
```

## Content principles

The site only states information the business has verified. It contains **no** invented testimonials, ratings, prices, warranties, certifications, manufacturer authorisations or turnaround promises. Customer reviews are linked to the real Google Business Profile, not copied or made up.

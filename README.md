# Veliora Energy Website

Official website for **Veliora Energy** ([velioragroups.com](https://velioragroups.com)): green energy solutions for a sustainable world.

**Live preview:** https://himancer.github.io/velioragroups-website/

> **Status: preview / work in progress.** The site contains placeholder content (figures, director names, contact details) and is set to `noindex` so search engines won't list it. See [Launch checklist](#launch-checklist) before going live.

---

## Contents

- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Run locally](#run-locally)
- [Editing content](#editing-content)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Custom domain setup](#custom-domain-setup)
- [Contact form setup](#contact-form-setup)
- [Launch checklist](#launch-checklist)
- [Future improvements](#future-improvements)
- [Security checklist](#security-checklist)
- [Further documentation](#further-documentation)

---

## Tech stack

| | |
|---|---|
| **Languages** | HTML5, CSS3, vanilla JavaScript (no framework, no build step) |
| **Fonts** | Poppins (headings), Inter (body) via Google Fonts |
| **Icons & illustrations** | Inline SVG, no external icon library |
| **Hosting** | GitHub Pages (preview); any static host works |
| **Forms** | Formspree (planned) |

Why plain HTML instead of React/Angular: see [decisions.md](decisions.md).

## Project structure

```
├── index.html        Home: hero, key figures, solutions overview, vision, process, CTA
├── about.html        About: story, vision/mission, values, directors, timeline, ESG
├── solutions.html    Solutions: solar, wind, storage, EV, hydrogen, consulting; sectors; financing
├── projects.html     (to do) filterable project portfolio
├── contact.html      (to do) enquiry form and contact details
├── css/styles.css    Single shared stylesheet (brand colours as CSS variables in :root)
├── js/main.js        Mobile nav, scroll animations, counters, project filters, contact form
├── assets/logo.svg   Logo and favicon
├── _config.yml       Stops GitHub Pages from publishing the .md docs
├── README.md         This file
├── flow.md           How the site works (page map, JS flow, diagrams)
└── decisions.md      Why things were built this way; domain and hosting guidance
```

## Run locally

No installation needed. Open `index.html` in a browser.

For a local server (closer to how it behaves live), run one of these from the project folder:

```bash
npx serve .
# or
python -m http.server 8000
```

## Editing content

| What | File | Where |
|------|------|-------|
| Key figures (MW, projects, CO₂, countries) | `index.html` | `.stats` section: edit `data-count`, `data-suffix` and the visible text |
| Directors | `about.html` | `#leadership`: replace "Director Name", role and bio; swap the icon for `<img src="assets/team/name.jpg" alt="Name">` |
| Timeline | `about.html` | "Our Journey" section |
| Services | `solutions.html` | One block per solution (`#solar`, `#wind`, `#storage`, `#ev`, `#hydrogen`, `#consulting`) |
| Photos | any page | Replace a `<div class="media-placeholder">…</div>` with an `<img>` |
| Phone, address, socials | **every page** | Footer: `+00 000 000 0000`, "Office Address, City, Country", `href="#"` |
| Brand colours | `css/styles.css` | `:root` variables at the top |

The header and footer are repeated in every HTML file, so change them in **all** pages.

To find every placeholder, search the project for `TODO`, `Director Name`, `+00`, `href="#"` and `YOUR_FORM_ID`.

## Deployment (GitHub Pages)

Already configured: **Settings → Pages → Deploy from a branch → `main` / `(root)`**.

Every push to `main` redeploys automatically in about a minute. Check progress in the **Actions** tab.

```bash
git add -A
git commit -m "Describe your change"
git push
```

## Custom domain setup

Do this **only after buying `velioragroups.com`**. Until then, leave the Pages "Custom domain" field empty.

1. **Verify the domain:** go to your profile **Settings → Pages → Add a domain**, enter `velioragroups.com`, and add the TXT record GitHub gives you at your registrar. This prevents other GitHub accounts from taking over the domain.
2. **Add DNS records at the registrar:**

   | Type | Host | Value |
   |------|------|-------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `himancer.github.io` |

   Remove any default "parked" record or domain forwarding.
3. **Set the domain:** in the repo's **Settings → Pages → Custom domain**, enter `velioragroups.com` and save.
4. After the DNS check passes, tick **Enforce HTTPS**.

**Choosing a registrar:** Hostinger (domain + hosting + email in one place), Cloudflare Registrar (at-cost renewals) or GoDaddy (usually higher renewals). Compare **renewal** prices, and register the domain in the **company's name**. Details are in [decisions.md](decisions.md#12-domain-godaddy-or-hostinger).

## Contact form setup

The site is static, so form submissions go through [Formspree](https://formspree.io):

1. Create a free Formspree account and a new form.
2. In `contact.html`, set the form action to `https://formspree.io/f/<your-form-id>`, replacing `YOUR_FORM_ID`.
3. Add a hidden spam trap to the form: `<input type="text" name="_gotcha" class="visually-hidden" tabindex="-1" autocomplete="off">`.

Until step 2 is done, the form tells visitors to email `info@velioragroups.com` instead.

## Launch checklist

### Pages and features
- [ ] Create `projects.html` (portfolio with filters; CSS and JS already exist)
- [ ] Create `contact.html` (form, phone, email, address, map)
- [ ] Privacy Policy page (required if the form collects personal data; India DPDP Act / GDPR)
- [ ] Terms of Use page
- [ ] Custom `404.html`
- [ ] Connect the Formspree form

### Real content
- [ ] Confirm brand spelling: **Veliora** vs **Veloria**
- [ ] Replace headline figures with real, verifiable numbers
- [ ] Director names, roles, bios and photos
- [ ] Timeline years and milestones
- [ ] Phone, office address and social media links (every page)
- [ ] Confirm which of the 6 services the company actually offers
- [ ] Real photos (WebP, under about 300 KB each), final logo, and a link-preview image (`og:image`, 1200×630)
- [ ] Company registration details if required (e.g. CIN, registered office, GSTIN); check with the company secretary

### Go live
- [ ] Buy the domain in the company's name
- [ ] Configure DNS and HTTPS ([Custom domain setup](#custom-domain-setup))
- [ ] Business email for `info@velioragroups.com` (Hostinger, Zoho Mail or Google Workspace)
- [ ] **Remove** `<meta name="robots" content="noindex, nofollow">` from every page
- [ ] Add `sitemap.xml` and `robots.txt`
- [ ] Submit to Google Search Console; create a Google Business Profile

## Future improvements

| Area | Ideas |
|------|-------|
| **Trust** | Certifications, partner/OEM logos, testimonials, case studies with real data |
| **Leads** | WhatsApp chat button, downloadable brochure (PDF), quote forms on the Solutions page |
| **Content** | FAQ, News/Blog (good for SEO), Careers, ESG/Sustainability report |
| **Interactive** | Solar savings / ROI calculator |
| **Analytics** | Cloudflare Web Analytics or Plausible (privacy-friendly, no cookie banner needed) |
| **Performance** | Self-host fonts, WebP images, `loading="lazy"`, Lighthouse audit |
| **Accessibility** | Run axe / Lighthouse and fix any contrast or labelling issues |
| **Maintainability** | Move to Astro once the site grows past about 8–10 pages (shared header/footer) |
| **Reach** | Multi-language support for target markets |

## Security checklist

The site is static (no server, database or logins), so the code itself has a small attack surface. The JavaScript never uses `innerHTML`, and the repo contains no secrets. The main risks are around accounts, the domain and email:

- [ ] **GitHub:** enable two-factor authentication on the account that owns this repo
- [ ] **GitHub email privacy:** turn on *Keep my email addresses private* and *Block command line pushes that expose my email*
- [ ] **Domain:** verify it in GitHub Pages **before** pointing DNS (prevents takeover)
- [ ] **Registrar:** turn on 2FA, domain lock (transfer lock) and auto-renew
- [ ] **Email spoofing:** add **SPF, DKIM and DMARC** records so no one can send fake invoices "from" `@velioragroups.com`
- [ ] **Contact form:** use the `_gotcha` honeypot and Formspree spam filtering; never commit API keys
- [ ] **Accurate claims:** don't launch with placeholder figures; unverified claims can be treated as misleading advertising
- [ ] **Privacy:** self-host Google Fonts (they send visitor IPs to Google, a GDPR concern) and publish a Privacy Policy
- [ ] **External links:** use `rel="noopener noreferrer"` on links with `target="_blank"`
- [ ] **Security headers:** GitHub Pages can't set them. If you move to Cloudflare Pages or Netlify, add a `_headers` file with `Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy`

## Further documentation

- [flow.md](flow.md): how the site works (page map, layout, JavaScript and form flow diagrams)
- [decisions.md](decisions.md): why it was built this way, domain vs hosting comparison, hosting options

---

© Veliora Energy. All rights reserved.

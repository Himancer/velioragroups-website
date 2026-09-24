# Veliora Energy Website: Decisions and Reasons

Each entry below records one decision, why it was made, and when it might be worth revisiting.

---

## 1. Plain HTML/CSS/JS instead of WordPress, React or a site builder

**Decision:** A static site written by hand, with no framework and no build step.

**Why:**
- A company website like this is mostly content (who we are, what we do, how to contact us). It doesn't need a database or user logins.
- It can be hosted **for free**, loads fast and has almost nothing that can be hacked. There are no plugins or admin panel to keep patched, as WordPress would need.
- Anyone can edit it in a text editor, and you can preview it by double-clicking `index.html`.

**Revisit if:** non-technical staff need to edit pages themselves every week, or the site needs a blog or news section with many posts. Options then would be WordPress/Hostinger Website Builder, or adding a headless CMS such as Decap CMS to this static site.

---

## 2. Page structure: Home, About, Solutions, Projects, Contact

**Decision:** Five pages, chosen after reviewing typical renewable-energy company sites (EPC developers, solar/wind IPPs, clean-energy groups).

**Why:** Sites in this sector almost always cover the same five areas:
1. **What you do** → Solutions (solar, wind, storage, EV, hydrogen, consulting)
2. **Who you are** → About, including vision/mission, **directors/leadership** and ESG
3. **Proof** → Projects portfolio and headline numbers (MW installed, CO₂ avoided)
4. **How to buy** → financing models (CAPEX, OPEX/RESCO, PPA)
5. **How to reach you** → Contact / Get a Quote

Each solution has its own anchor (`solutions.html#solar`, etc.) so the Home cards and footer links go straight to the relevant section. This avoids six separate thin pages.

**Revisit if:** one solution grows big enough to need its own page (for example a dedicated Green Hydrogen page for investors).

---

## 3. Six solutions, including green hydrogen and EV charging

**Decision:** Solar, Wind, Energy Storage, EV Charging, Green Hydrogen, Energy Consulting & O&M.

**Why:** You described the vision as *"green energy solutions across the world"*. This set covers the whole modern clean-energy value chain (generation → storage → usage → industrial decarbonisation), which makes the company look forward-looking and global rather than "just a solar installer".

**Action for you:** **Confirm with your friend which of these Veliora actually offers.** Remove or reword any that don't apply. It is better to list fewer services truthfully.

---

## 4. Visual design: deep greens with lime/sun accents

**Decision:** A dark forest-green brand colour (`#0b3d2e`), fresh green and lime highlights, and sun-yellow for solar. Poppins for headings, Inter for body text.

**Why:**
- Green is instantly understood as "sustainable". The dark shade keeps it corporate and trustworthy rather than playful.
- Lime and yellow suggest sun and energy, and they give the buttons and highlights something to stand out against.
- Every colour is a CSS variable in [css/styles.css](css/styles.css), so a real brand palette can replace these in one place.

---

## 5. Drawn SVG illustrations and icons, no stock photos (for now)

**Decision:** The hero is an animated SVG of wind turbines and solar panels. Icons are inline SVGs. Image areas use styled `.media-placeholder` blocks.

**Why:**
- You said images would come later. Placeholders keep the layout correct in the meantime, and each one can be swapped for an `<img>` tag.
- Stock photos copied from other websites can cause copyright problems. SVGs drawn in code are original and sharp at any size.
- Inline icons need no icon library download.

**Next step:** Use real project photos where possible. Otherwise use free-licence sources (Unsplash, Pexels) and compress them (WebP, under about 300 KB each).

---

## 6. Placeholder numbers, names and contact details, marked with TODOs

**Decision:** Stats such as "500+ MW", "Director Name", `+00 000 000 0000` and "Office Address" are clearly fake and marked with `<!-- TODO -->` comments.

**Why:** I don't have Veliora's real data. Obvious placeholders are safer than realistic-looking invented facts, which could mislead customers if the site went live by mistake.

**Action for you:** Replace every placeholder before launch (see the table in [flow.md](flow.md)). Search the project for `TODO`, `Director Name`, `+00` and `href="#"`.

---

## 7. Shared header/footer copied into each page

**Decision:** The header and footer HTML is repeated in every page file.

**Why:** Without a build tool or server, HTML has no built-in way to "include" another file. The alternative, loading them with JavaScript, would make search engines see empty headers and would break when JS is off. Five pages is a small enough number to maintain by hand.

**Trade-off:** A nav or footer change has to be made in every page.

**Revisit if:** the site grows past about 8–10 pages. Then move to a simple static-site generator (Eleventy, Astro) that supports shared layouts.

---

## 8. Small JavaScript, progressive enhancement

**Decision:** One small script ([js/main.js](js/main.js)). The site is fully readable without it.

**Why:**
- Content is only hidden for the fade-in animation if JS is actually running (the `.js` class trick), so nothing is ever stuck invisible.
- Animations are skipped for users with "reduce motion" turned on.
- Features only switch on when their elements exist on the page, so the same file works on every page.

---

## 9. Contact form through Formspree

**Decision:** The form will POST to Formspree (or a similar service). While the placeholder `YOUR_FORM_ID` is still in place, the form tells users to email instead.

**Why:** A static site has no server to send emails. Formspree has a free tier, forwards submissions to your inbox, and handles spam filtering. The placeholder check stops the form from failing silently before it is set up.

**Setup:** Create a free account at formspree.io → New Form → copy the ID → paste it into the `action` URL in `contact.html`.

**Alternatives:** Netlify Forms (if hosted on Netlify), Web3Forms, or Hostinger's form tools.

---

## 10. SEO and accessibility basics built in

**Decision:** Every page has a unique `<title>` and meta description, Open Graph tags (for link previews on WhatsApp and LinkedIn), a canonical URL on velioragroups.com, and Organization structured data on the home page. Accessibility features include a skip link, ARIA labels on the menu button, `aria-current` on the active page, and SVG icons hidden from screen readers.

**Why:** These cost almost nothing to add now. They help Google show the company properly, and they meet basic accessibility expectations that corporate and government clients often check for.

**Later:** Add `sitemap.xml` and `robots.txt`, submit the site in Google Search Console, and create a Google Business Profile.

---

## 11. Brand name spelling

**Decision:** The site uses **"Veliora"** everywhere, to match the domain *velioragroups.com* you gave.

**Note:** The project folder is named "Veloria Energy" (different spelling). **Confirm the correct spelling with your friend** before buying the domain. A spelling mismatch between the brand and the domain is expensive to fix later.

---

## 12. Domain: GoDaddy or Hostinger?

**Recommendation:** Buy the domain from **Hostinger** if you want everything in one place (domain + hosting + email). Choose **Cloudflare Registrar** if you only want the domain at the lowest long-term cost. GoDaddy works fine too, but it tends to have higher **renewal** prices and many add-on upsells at checkout.

| | GoDaddy | Hostinger | Cloudflare Registrar |
|---|---|---|---|
| First-year price | Often a low promotional price | Low, often discounted with hosting | At-cost |
| Renewal price | Typically higher | Moderate | At-cost (no markup) |
| Upsells at checkout | Many (untick them) | Some | None |
| Business email | Paid add-on | Included with most hosting plans | Not included (Email Routing forwards only) |
| Best for | Brand familiarity | All-in-one beginner setup | Cheapest renewals, tech-comfortable users |

**Tips whichever you choose:**
- Check the **renewal** price, not only the first-year price. Prices change often, so compare on the day you buy.
- Make sure **WHOIS privacy** is on (it is usually free).
- Register the domain in **your friend's / the company's name and email**, not yours. It is a business asset.
- Turn on auto-renew and two-factor authentication.

---

## 13. Hosting: how to put the site online

Because the site is static, **you don't need paid hosting**. Two good paths:

### Option A (recommended): free static hosting (Cloudflare Pages or Netlify)
1. Put this folder in a GitHub repository (or drag-and-drop the folder in Netlify).
2. Connect the repo in Cloudflare Pages or Netlify → deploy. No build command; the output folder is the project root.
3. Add the custom domain `velioragroups.com` in the host's dashboard.
4. At your domain registrar, update DNS as the host instructs (either switch nameservers, or add a CNAME for `www` and an A/ALIAS record for the root domain).
5. HTTPS is issued automatically and free.
6. For future changes, push to GitHub and the site redeploys by itself.

### Option B: Hostinger shared hosting
1. Buy a Hostinger hosting plan (it usually includes the domain for year one, plus email).
2. hPanel → File Manager → upload every file into `public_html/`.
3. Enable the free SSL certificate in hPanel.
4. Create the `info@velioragroups.com` mailbox in hPanel → Emails.

**Why A is recommended:** it's free, fast worldwide via a CDN, gives automatic HTTPS, and keeps a version history. **Choose B** if you want one bill and a control panel, and especially if you want business email included.

### Business email
The site uses `info@velioragroups.com`. You need email hosting for this address to work:
- Included with Hostinger hosting plans, **or**
- Zoho Mail (has a free tier for small teams), **or**
- Google Workspace / Microsoft 365 (paid, most professional).

Set up the email's **MX, SPF and DKIM** DNS records as the email provider tells you, so messages don't land in spam.

---

## Launch checklist

- [ ] Confirm brand spelling (Veliora vs Veloria)
- [ ] Buy the domain in the company's name
- [ ] Create `projects.html` and `contact.html`
- [ ] Replace all placeholders (stats, directors, timeline, phone, address, socials)
- [ ] Confirm the list of services
- [ ] Add real photos and a final logo
- [ ] Set up the Formspree form ID
- [ ] Set up business email
- [ ] Deploy and connect the domain with HTTPS
- [ ] Add a Privacy Policy page (required if the contact form collects personal data)
- [ ] Add `sitemap.xml` and `robots.txt`, then submit to Google Search Console

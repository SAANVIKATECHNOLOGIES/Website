# Owner Approval Checklist

These items were **left out on purpose** or are **disabled** until the owner confirms them. Nothing below appears on the live site until it is switched on.

## ✅ Verified and live

- [x] Business name: SAANVIKA TECHNOLOGIES
- [x] Tagline: Reliable Tech. Clear Solutions.
- [x] Category: Computer Repair, Computer Services and IT Support
- [x] Address: Plot No. 401, Sri Gayatri Nivas, Near Big Basket, Chandrampalem, Srinivasa Nagar, Madhurawada, Visakhapatnam, Andhra Pradesh – 530041
- [x] Phone and WhatsApp: +91 88863 33367
- [x] Google Maps listing link
- [x] Domain: www.saanvikatechnologies.com
- [x] Services: *Computer Repair & Services*, *IT Consulting & Support*

## ⏳ Waiting for confirmation

| Item | Where to switch it on | Notes |
|---|---|---|
| Email address | `assets/js/config.js` → `contact.email` | Set `address` and `enabled: true` |
| Business hours | `assets/js/config.js` → `contact.hours` | e.g. `lines: ["Mon – Sat: 10:00 AM – 8:00 PM"]`. Also consider adding `openingHours` to the JSON-LD in `index.html`. |
| Laptop troubleshooting | `config.js` → `services` | `enabled: true` |
| Desktop troubleshooting | `config.js` → `services` | `enabled: true` |
| Hardware repair & upgrades | `config.js` → `services` | `enabled: true` |
| Operating system & software support | `config.js` → `services` | `enabled: true` |
| Screen & keyboard replacement | `config.js` → `services` | `enabled: true` |
| Printer & peripheral support | `config.js` → `services` | `enabled: true`. If confirmed, also add "Printer" to the Device list in the enquiry form (`index.html`, `#f-device`). |
| Network & Wi-Fi assistance | `config.js` → `services` | `enabled: true` |
| Data backup & recovery | `config.js` → `services` | `enabled: true`. Avoid promising that recovery will succeed. |
| Map pin | `index.html` → `.map-wrap iframe` | Check that the embedded map points to the shop. For an exact pin, open the Google Maps listing → **Share → Embed a map** → copy the `src` URL into the iframe. |
| Map coordinates (geo) | `index.html` JSON-LD | Optional: add `"geo": {"@type":"GeoCoordinates","latitude":…,"longitude":…}` from the listing |
| Google rating / review count | Reviews section | Deliberately **not shown**. Only add it if you are prepared to keep it current. The "Read Customer Reviews" button links to the live listing instead. |
| Social media profiles | Footer in `index.html`, and `sameAs` in the JSON-LD | Add only official accounts |
| Custom domain DNS | GoDaddy DNS. See README → "Custom domain" | Then enable **Enforce HTTPS** in Settings → Pages |
| Logo approval | `assets/brand/` | See `docs/BRAND.md` and `docs/brand-sheet.html` |

## 🚫 Deliberately not stated anywhere

Do not add any of these unless they are true and you are prepared to honour them:

- Diagnostic or inspection fees, or any prices
- Repair turnaround times (e.g. "same-day repair")
- Warranties or guarantees on repairs or parts
- Technician certifications or manufacturer authorisations (Dell, HP, Apple, etc.)
- Customer testimonials (only real, permissioned quotes; never invented)
- Pickup/drop or on-site service areas

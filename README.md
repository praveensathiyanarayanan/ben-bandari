# Ben Bandari — Sovereign Real Estate Advisory

An ultra-luxury, contemporary real estate portfolio and private advisory practice website for **Ben Bandari**. Built around architectural permanence, discreet generational stewardship, and surgical transaction advocacy.

---

## Architecture & Design Highlights

- **Deck Stacking Curtain Parallax:** Smooth, pinned vertical section-over-section curtain transitions powered by GSAP and ScrollTrigger.
- **Architectural Framing & Corner Borders:** Hand-crafted 90° architectural viewfinder corner brackets framing all 7 sections.
- **Curated Sovereign Portfolio:** Interactive horizontal carousel featuring 10 trophy mandates across Residential, Penthouses, and Sovereign Estates with live filtering.
- **Track Record:** Comprehensive verified transacted mandates with uniform box proportions and detailed dossier modal overlays.
- **Sovereign Color Palette:**
  - Deep Sovereign Obsidian (`#0E0E0E`)
  - Royal Metallic Gold (`#DFC282`, `#C5A059`)
  - Crisp Architectural White (`#FFFFFF`)
- **Bespoke Crest & Monogram Favicon:** Multi-format vector SVG, high-res PNG, and multi-size ICO.

---

## Project Structure

```text
ben-bandari/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD deployment
├── public/
│   ├── index.html              # Main website application
│   ├── styles.css              # Core architectural stylesheet
│   ├── app.js                  # Interactivity, GSAP Deck, Modals & Filters
│   ├── favicon.svg             # Vector Monogram Crest Favicon
│   ├── favicon.png             # 64x64 PNG Favicon
│   ├── favicon.ico             # Windows/Browser Favicon
│   ├── hero-base.jpg           # Hero architectural visual
│   ├── ben-bandari.jpg         # Principal portrait asset
│   ├── gsap.min.js             # GSAP core engine
│   └── ScrollTrigger.min.js    # ScrollTrigger plugin
├── server.js                   # Local Node.js preview server & enquiry API
├── package.json
└── README.md
```

---

## Local Development

To run locally:

```bash
# Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Start the local development server
node server.js
```

Open `http://localhost:2002` in your browser.

---

## Deployment via GitHub Pages

This repository is pre-configured with an automated GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Go to your repository on GitHub: **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Push to `main` branch to automatically trigger a live deployment.

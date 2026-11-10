# parth01.xyz

Personal site of Parth Garg: AI/ML and security engineering projects, papers, a patent application, experience and contact details. It is a single page built with React, Vite, Tailwind CSS and GSAP, and deployed on Netlify.

## Run it locally

```bash
git clone https://github.com/parth-garg01/Profile.git
cd Profile
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

Changes to `tailwind.config.js` only show up after restarting the dev server.

## How it is put together

| Path | What it holds |
|---|---|
| `src/data/index.js` | All site content: profile, featured projects, the project list, papers, experience, recognition, toolkit, contact |
| `src/components/` | One component per section: `Hero`, `About`, `Work`, `Papers`, `Projects`, `Experience` (with `Recognition`), `Contact`, plus `Navbar` and shared `ui` pieces |
| `src/components/work/` | The three animated demos for the featured projects, loaded only when needed |
| `src/lib/motion.jsx` | Scroll scenes and reveal animations (see below) |
| `src/index.css` | Base styles and the three type voices: `t-wide`, `t-poster`, `t-serif` |
| `tailwind.config.js` | Colour palette, fonts and type scale |
| `public/` | Favicon, the resume PDF and the BlindSpot prototype photo |

To change any text, edit `src/data/index.js`. To replace the resume, overwrite `public/Parth_Garg_Resume.pdf`.

## Design

- **Palette:** amber, violet, blue, cream, sun, coral, mint, pink and teal, with navy ink for text on light colours.
- **Type:** Anybody (variable width) for display, Instrument Sans for body text and Instrument Serif for sentence-like headings. Each section sticks to one display voice.

## Motion

- Every section is a sticky scene. It stays pinned while the next one slides over it, and holds for a short stretch of scrolling at its end first.
- A scene's contents stay hidden while it slides in and play once it reaches the top of the screen: headings rise line by line from their baseline, cards open from the bottom and rows sweep in from the left.
- The three project cards and the Papers panel land on the stack with a curved top edge.
- Nothing is tied to scroll position frame by frame, and everything is switched off for visitors who ask for reduced motion.

## Deploy

Netlify builds every push to `main` with `npm run build` and publishes `dist` (see `netlify.toml`).

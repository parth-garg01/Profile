# Portfolio Website — Project Summary
### Parth Garg | B.Tech Computer Science, VIT Vellore

---

## Overview

This is a personal portfolio website built to showcase my skills, projects, achievements, education, and work experience in a visually engaging and interactive way. The website is a single-page application (SPA) — meaning everything lives on one page and you scroll through sections rather than navigating to different links. It was built using modern front-end technologies and is designed to look professional while also being smooth and responsive across different screen sizes.

---

## Technology Stack & Tools

The website is built using **React** (version 18), which is a popular JavaScript library for building user interfaces. To run and bundle the project quickly during development, **Vite** (version 5) is used as the development server and build tool. For styling, the project uses **Tailwind CSS** (version 3), which is a utility-based CSS framework that makes it easy to build custom designs directly in the markup.

### Libraries Installed

Here is a breakdown of each library used and what it does in the project:

| Library | Version | Purpose |
|---|---|---|
| **React** | ^18.2.0 | Core framework for building the UI in components |
| **React DOM** | ^18.2.0 | Renders React components into the browser |
| **Vite** | ^5.0.0 | Development server and production build tool |
| **Tailwind CSS** | ^3.3.5 | Utility-first CSS framework for styling |
| **GSAP** | ^3.14.2 | Professional animation library for scroll-based animations and timeline effects |
| **Framer Motion** | ^10.16.4 | React-native animation library for entrance effects and hover animations |
| **Three.js** | ^0.182.0 | 3D graphics library used for the animated background in the hero section |
| **React Icons** | ^5.5.0 | Large library of icons (used for skill icons like Python, React, Git, etc.) |
| **Lucide React** | ^0.292.0 | Clean icon set used throughout the UI (navbar toggle, contact icons, etc.) |
| **PostCSS** | ^8.4.31 | CSS post-processing tool, used alongside Tailwind |
| **Autoprefixer** | ^10.4.16 | Automatically adds vendor prefixes to CSS for cross-browser compatibility |

> Note: `react-particles`, `tsparticles`, and `tsparticles-slim` are listed as dependencies but are currently not actively used in the UI.

**Google Fonts** are loaded via a CSS import (no npm install required) — the three fonts used are:
- **Manrope** — used for body/paragraph text
- **Oswald** — used for headings and display titles
- **Space Mono** — used for labels, tags, and monospace-style text

---

## Website Sections

The website is made up of **15 React components**, each representing a distinct section or utility. Here's what each one does:

### 1. Navbar
A fixed navigation bar at the top of the page with links to all sections (About, Education, Skills, Achievements, Projects, Hobbies, Journey, Contact). On scroll, the background becomes slightly transparent with a blur effect (glassmorphism). On smaller screens, it collapses into a hamburger menu with a smooth open/close animation powered by Framer Motion.

### 2. Hero Section
The very first thing a visitor sees. It displays the name "PARTH GARG" with a cinematic entrance animation — each letter flies in from below with a blur and scale effect. The subtitle and description fade in right after. There is also a **3D parallax tilt effect**: when you move your mouse, the text tilts subtly in 3D to follow the cursor. A small animated scroll indicator sits at the bottom.

### 3. HeroScene (Three.js 3D Background)
Running behind the hero text is a live 3D scene built with Three.js. It contains a rotating wireframe icosahedron (a geometric shape), two orbital rings at different angles, and 35 floating particles — all rendered in a gold/amber accent colour. The 3D objects react to mouse movement by rotating slightly in the direction of the cursor. The scene is lazy-loaded (it only loads when needed) to keep page speed fast.

### 4. About
A simple section with a glassmorphism-style card (blurred background, subtle border) that contains a paragraph about who Parth is — his interests, skills, and current focus areas.

### 5. Education
Lists all academic qualifications in card form — from primary school up to the current B.Tech at VIT Vellore. Each card slides in from below as you scroll past them, which is handled by Framer Motion's `whileInView` feature.

### 6. Skills (Technical Arsenal)
Displays all technical skills as a grid of icon cards. Each skill has its **official brand-coloured icon** — for example, Python gets its blue icon, JavaScript gets its yellow one. When you hover over a card, it scales up slightly. The section heading slides up into view when you scroll to it.

### 7. Achievements & Certifications
Shows certifications, awards, and workshops in a grid of cards. Each card shows the title, issuer, date, and a short description. Awards get a trophy icon; everything else gets a checkmark. Cards smoothly lift up on hover.

### 8. Projects
A grid of project cards, each showing the project title, description, technologies used as small tags, and links to the GitHub repo and live demo. Currently listed projects include the Blind Aid System, MyTuneVault, Thermal DDoS Detector, Government Workflow Optimizer, and this portfolio itself.

### 9. Hobbies & Interests
A simple icon-based grid showing hobbies like Coding, Hackathons, Abacus, Harmonium (music), Public Speaking, Robotics, Chess, Reading, and Travel. Each hobby has a relevant icon from the Lucide library.

### 10. Journey (Experience Timeline)
A vertical timeline showing key milestones — internship at Fintoric Capital as a Data Analyst, the current B.Tech programme at VIT, and the role of R&D Head at TAM-VIT. Each entry slides in from the left as you scroll. Technology tags are shown at the bottom of each entry.

### 11. Contact
A single card with a "Let's Connect" call-to-action. Has a button that opens the user's email client with Parth's email pre-filled, and icon buttons for LinkedIn and GitHub.

---

## Special UI Features

### Custom Cursor
The default browser cursor is hidden and replaced with a custom two-part cursor — a small dot that follows the mouse exactly, and a larger ring that follows with a slight delay (using linear interpolation / lerp). When the cursor moves over a clickable element like a link or button, both parts scale up to give visual feedback.

### Scroll Progress Bar
A thin gold-coloured line sits at the very top of the page and grows from left to right as you scroll down. It acts as a progress indicator for how far through the page you are. It is powered by GSAP's ScrollTrigger plugin with a scrub effect (it moves in real-time with the scroll, not just on trigger).

### Scroll-Based Animations (GSAP ScrollTrigger)
Almost every section heading "grows" a short underline from the centre when it comes into view. Section headings also slide up from below. These are all handled by GSAP's ScrollTrigger, which watches when elements enter the viewport and plays the animation at that point.

### Hero Parallax Fade
As you scroll past the Hero section, the text slowly fades out, scales down slightly, and blurs — giving the effect of content disappearing into the background as the next section takes over.

---

## Design System

The colour palette used throughout the site is:
- **Background:** Deep navy-black (`#010113`)
- **Accent:** Gold/amber (`#E6B35C`)
- **Text:** White and semi-transparent white (`rgba(255,255,255,0.7)`)

This palette and the three font families are configured in `tailwind.config.js` as custom theme tokens so they can be used everywhere consistently.

A custom scrollbar is also styled — dark track with a gold thumb on hover — to match the overall aesthetic.

---

## Deployment & Build

The project is deployed to a custom domain (configured via a `CNAME` file, typically used with GitHub Pages). The production build is generated using `npx vite build`, which outputs optimised assets to the `dist` folder.

---

*Summary prepared for academic assessment — February 2026*

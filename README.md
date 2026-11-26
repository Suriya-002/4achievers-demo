# 4Achievers — Website Clone (Static)

A self-contained, offline-friendly recreation of an IT training-institute marketing website
(inspired by the layout of 4achievers.co.in), built with plain **HTML + CSS + vanilla JS** —
no build step, no dependencies, no server required.

## How to view

Just **double-click `index.html`** (or open it in any browser). Everything runs locally.

> Tip: For the nicest experience (and to avoid any browser quirks), you can serve the folder:
> ```powershell
> cd D:\4achievers
> python -m http.server 8080   # then open http://localhost:8080
> ```

## Project structure

```
D:\4achievers\
├─ index.html                      # Homepage (reference page — all sections)
├─ courses.html                    # All-courses catalog
├─ about.html                      # About us
├─ contact.html                    # Contact + enquiry form
├─ placement.html                  # Placement support
├─ campuses.html                   # 15 training centers
├─ journal.html                    # Blog / guides listing
├─ course-data-science.html        # Course detail pages ↓
├─ course-python-full-stack.html
├─ course-java-full-stack.html
├─ course-software-testing.html
├─ course-aws-cloud.html
├─ course-data-analytics.html
├─ css/
│  └─ styles.css                   # Complete design system (single source of truth)
├─ js/
│  ├─ layout.js                    # Injects the shared header + footer into every page
│  └─ main.js                      # Counters, tabs, FAQ accordion, scroll-reveal, forms
└─ assets/
   └─ img/logo.svg                 # Original logo mark / favicon
```

## How it works

- **Shared header & footer** are injected by `js/layout.js` into `<div id="site-header">` and
  `<div id="site-footer">` on every page — so navigation stays consistent and is edited in one place.
- **Design system** lives entirely in `css/styles.css` (CSS variables for colors/spacing, plus
  reusable component classes: buttons, cards, hero, tabs, steps, testimonials, accordion, forms, etc.).
- **Interactions** (`js/main.js`): animated stat counters, tabbed course catalog, FAQ accordion,
  scroll-reveal animations, sticky-header shadow, and demo form handling (no backend — forms show a
  success message).
- **Fully responsive** — desktop, tablet and mobile (hamburger menu + collapsible mega-menu).

## Customising

- **Colors / fonts / spacing** → edit the `:root` tokens at the top of `css/styles.css`.
- **Navigation, contact numbers, footer** → edit `js/layout.js`.
- **Any page's content** → edit that page's `.html` file directly.

## Notes on assets (important)

To keep this project 100% offline and avoid using third-party copyrighted material, it deliberately
**does not** include the original site's photos or any trademarked company logos:

- The **logo** is an original SVG mark.
- **Partner/employer and certification names** are shown as plain text "chips", not their real logos.
- **Photos** (hero, campuses, projects, people) are CSS gradient placeholders / avatar initials.

Replace these with your own licensed images/branding before any public or commercial use. All copy is
original placeholder marketing text.

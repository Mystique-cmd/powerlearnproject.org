# React Tailwind Demo

A minimal React 18 + Vite + Tailwind CSS project that demonstrates component architecture, routing, dark/light theme with Context, localStorage with a custom hook, and a small API demo (search + infinite scroll) using JSONPlaceholder.

## Features
- React 18 with Vite for fast dev/build
- Tailwind CSS with dark mode (class strategy)
- React Router (Home, Tasks, API Demo pages)
- Theme toggle using Context API (persists to localStorage)
- Tasks page: add/toggle/delete tasks, filter (All/Active/Completed), persisted in localStorage
- API demo page: fetch posts, client-side search, infinite scroll, simple pagination controls

## Tech Stack
- React 18, React Router DOM
- Vite
- Tailwind CSS (PostCSS + Autoprefixer)

## Quick Start
Prerequisites: Node.js 18+ and npm

1. Install dependencies:
   npm install
2. Start the dev server:
   npm run dev
3. Open the app:
   http://localhost:5173

## Available Scripts
- npm run dev — start Vite dev server
- npm run build — production build to dist
- npm run preview — preview the production build locally

## Project Structure
- index.html — Vite HTML entry
- src/
  - main.jsx — React entry
  - components/
    - App.jsx — App shell with routing and ThemeProvider
    - index.css — Tailwind directives + global styles
    - styles/animations.css — custom CSS animations and variables
    - layout/
      - Layout.jsx — layout wrapper with Navbar/Footer
    - common/
      - Navbar.jsx — top navigation + theme toggle
      - Footer.jsx — footer links
      - Button.jsx — UI button with variants
      - Card.jsx — simple card container
    - pages/
      - Home.jsx — landing page with sample grid and links
      - Tasks.jsx — tasks manager using localStorage
      - ApiDemo.jsx — JSONPlaceholder posts search + infinite scroll
    - hooks/
      - useLocalStorage.js — small hook for persisting state
    - context/
      - ThemeContext.jsx — dark/light theme state and provider
    - utils/
      - fetcher.js — tiny fetch helper
- tailwind.config.js — Tailwind configuration (darkMode: 'class')
- postcss.config.js — PostCSS plugins (tailwindcss, autoprefixer)
- vite.config.js — Vite config with React plugin
- package.json — scripts and dependencies

## Routes
- / — Home
- /tasks — Tasks demo
- /api — API demo (JSONPlaceholder posts)

## Development Notes
- Tailwind is enabled via src/components/index.css which imports ./styles/animations.css and defines global variables.
- Dark mode is toggled by applying the "dark" class to the html element inside ThemeContext.
- If you relocate files, ensure relative import paths are correct to avoid Vite import-analysis errors.

## Build and Deploy
1. Build the project:
   npm run build
2. The output will be in dist/. Serve this folder with any static host (Vercel, Netlify, GitHub Pages, Nginx, etc.).
3. Vite preview test locally:
   npm run preview

### Deploy to Vercel
This repo is pre-configured for Vercel static hosting with SPA routing via vercel.json.

- Prerequisites: A GitHub/GitLab/Bitbucket repository and a Vercel account.
- Steps:
  1. Push this project to your Git repository.
  2. In Vercel, click "New Project" → "Import" your repo.
  3. Framework Preset: Other (or Vite). Build Command: npm run build. Output Directory: dist.
  4. No environment variables are required. Click Deploy.
- Routing: vercel.json includes a catch‑all rewrite to /index.html so React Router routes like /tasks and /api work on refresh.
- After deploy, your site will be available at a vercel.app URL. You can add a custom domain in the Vercel dashboard.

## Troubleshooting
- Node version: Ensure Node.js v18+.
- Port in use: If 5173 is busy, Vite will propose another port; or free the port and restart.
- Import errors (plugin:vite:import-analysis): Check relative paths, especially when moving files between folders.
- CSS not applying: Verify index.css is imported in src/main.jsx and Tailwind content paths include ./index.html and ./src/**/*.{js,ts,jsx,tsx}.

## License
This project is provided as a learning/demo template. Use freely for educational purposes.
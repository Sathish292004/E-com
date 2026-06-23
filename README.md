# SK Store — E-Com (Frontend)

A React + Vite storefront for electronics, fashion and lifestyle products, built by [Sathish292004](https://github.com/Sathish292004).

🔗 **Live demo:** [ecom-two.vercel.app](https://ecom-two.vercel.app)
🔌 **Backend:** [E-com-Backend](https://github.com/Sathish292004/E-com-Backend)

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)

## Overview

SK Store is the client-side application for an e-commerce platform. It renders the product catalog, handles client-side routing, and talks to the [E-com-Backend](https://github.com/Sathish292004/E-com-Backend) API for data.

## Tech Stack

| Category | Library |
|---|---|
| Framework | React 18, Vite 5 (`@vitejs/plugin-react-swc`) |
| Routing | React Router DOM v6 |
| UI / Styling | Bootstrap 5, React-Bootstrap, Bootstrap Icons, Sass |
| HTTP Client | Axios |
| Notifications | React Toastify |
| Animation | Framer Motion |
| Icons | React Icons |
| Chat UI | `@chatscope/chat-ui-kit-react` |
| Linting | ESLint |

## Project Structure

```
E-com/
├── public/          # Static assets served as-is
├── src/             # App source (components, pages, App.jsx, main.jsx, styles)
├── index.html       # Vite entry HTML
├── vite.config.js   # Vite configuration
├── package.json
└── .env             # Local environment variables
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- The [E-com-Backend](https://github.com/Sathish292004/E-com-Backend) API running (defaults to `http://localhost:8080`)

### Installation

```bash
git clone https://github.com/Sathish292004/E-com.git
cd E-com
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL="http://localhost:8080"
```

Point `VITE_BASE_URL` at wherever your backend instance is running (local, staging, or production).

### Running the App

```bash
npm run dev       # Start the Vite dev server
npm run build      # Production build → /dist
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

The dev server runs on Vite's default port (`http://localhost:5173`) unless configured otherwise.

## Deployment

The live demo is deployed on [Vercel](https://vercel.com). Any static host that supports Vite builds (Vercel, Netlify, etc.) will work — just run `npm run build` and deploy the `dist/` folder, setting `VITE_BASE_URL` to your production API URL as an environment variable on the host.

## Notes

- `.env` is currently committed to the repo for local-dev convenience and only contains the local API base URL (no secrets). If you add real credentials later, move them to `.gitignore`.
- The `__MACOSX` folder in the repo root is a leftover from a zip extraction on macOS and can be safely deleted/`.gitignore`'d.

## Author

**Sathish Kumar** — [@Sathish292004](https://github.com/Sathish292004)

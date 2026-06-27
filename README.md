# The 7 Kingdoms

A Game of Thrones themed full-stack web application for exploring the world of Westeros — characters, houses, and books from the Ice and Fire universe.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21, NgRx 21, Tailwind CSS v4 |
| Backend | Fastify 5, TypeScript, Zod 4 |
| Auth | JWT (httpOnly cookie), bcrypt |
| Process | PM2 |

## Monorepo Structure

```
the-7-kingdoms/
├── api-the-7-kingdoms/   # Fastify REST API
└── ui-the-7-kingdoms/    # Angular SPA
```

## Prerequisites

- Node.js 24+
- npm

## Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd the-7-kingdoms
```

### 2. Backend

```bash
cd api-the-7-kingdoms
npm install
cp .env.example .env   # fill in JWT_SECRET and other vars
npm run dev
```

API runs on `http://localhost:3000`.

### 3. Frontend

```bash
cd ui-the-7-kingdoms
npm install
npm start
```

App runs on `http://localhost:4200`.

### 4. Ambient sound (optional)

Place looping audio files in `ui-the-7-kingdoms/public/sounds/`:

```
public/sounds/rain.mp3    # rain + thunder — plays in light mode
public/sounds/night.mp3   # night ambience — plays in dark mode
```

The sound icon in the header is muted by default; the user enables it per session.

## Features

- **Authentication** — register, login, logout with JWT stored in httpOnly cookies; remember me support
- **Auth page** — split-screen layout on desktop: lore story panel on the left, login/signup card on the right; stacked on mobile
- **Books** — browse all books with character counts
- **Characters** — paginated list/grid with name/gender filters, culture and gender display, detail modal, favorites
- **Houses** — paginated list/grid with name/region filters, house words display, detail modal, favorites
- **List / Grid layout** — toggle between list rows and card grid on Characters and Houses pages; grid defaults to 20 items per page
- **Responsive filters** — filter bars wrap gracefully on mobile; layout toggle always accessible
- **Favorites** — star characters and houses; dedicated favorites page with tabs, empty state navigation
- **Ambient FX** — rain animation in light mode, star field in dark mode (CSS-only, GPU-accelerated)
- **Ambient sound** — rain + thunder (light mode) / night sounds (dark mode); session toggle in header
- **Dynamic page titles** — `Page | The 7 Kingdoms` via custom Angular `TitleStrategy`
- **Dark mode** — full light/dark theme support persisted to localStorage
- **Responsive** — mobile sidebar + desktop header navigation

## Build

### Backend

```bash
cd api-the-7-kingdoms
npm run build
npm start
```

### Frontend

```bash
cd ui-the-7-kingdoms
npm run build
```

## Environment Variables

See `api-the-7-kingdoms/.env.example` for required backend variables.

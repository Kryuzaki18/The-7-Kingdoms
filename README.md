# The 7 Kingdoms

A Game of Thrones themed full-stack web application for exploring the world of Westeros — characters, houses, and books from the Ice and Fire universe.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21, NgRx, Tailwind CSS v4 |
| Backend | Fastify 5, TypeScript, Zod |
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

## Features

- **Authentication** — register, login, logout with JWT stored in httpOnly cookies; remember me support
- **Books** — browse all books with character counts
- **Characters** — paginated list with name/gender filters, culture and gender display, detail modal
- **Houses** — paginated list with name/region filters, coat of arms display, detail modal
- **Favorites** — star characters and houses; dedicated favorites page with tabs, empty state navigation
- **Dynamic page titles** — `Page | The 7 Kingdoms` via custom Angular `TitleStrategy`
- **Dark mode** — full light/dark theme support
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

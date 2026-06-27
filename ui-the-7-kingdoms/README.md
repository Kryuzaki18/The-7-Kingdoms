# ui-the-7-kingdoms

Angular SPA for The 7 Kingdoms app — a Game of Thrones themed explorer for characters, houses, and books from the Ice and Fire universe.

## Tech Stack

- **Framework** — Angular 21.2 (standalone components, signals, new control flow)
- **State** — NgRx 21 Store + Effects (functional style)
- **Styling** — Tailwind CSS v4 with `@tailwindcss/postcss`
- **Testing** — Vitest 4
- **Fonts** — Cinzel · EB Garamond · Lora · Lato (Google Fonts)

## Getting Started

```bash
npm install
npm start
```

App runs on `http://localhost:4200` and proxies API calls to `http://localhost:3000`.

## Scripts

| Script | Description |
|---|---|
| `npm start` | Dev server with API proxy |
| `npm run build` | Production build to `dist/` |
| `npm run watch` | Watch build (development) |
| `npm test` | Run unit tests with Vitest |

## Features

| Feature | Details |
|---|---|
| Authentication | Login, signup, logout; JWT via httpOnly cookie; remember me |
| Auth layout | Desktop: lore story panel (left) + form card (right); mobile: stacked |
| Books | Full book list with character count badges |
| Characters | Paginated list/grid, name/gender filters, culture + gender display, detail modal, favorites |
| Houses | Paginated list/grid, name/region filters, house words display, detail modal, favorites |
| List / Grid layout | Toggle on Characters and Houses; grid defaults to 20 per page, list to 10 |
| Responsive filters | Filter bars wrap on mobile; layout toggle always accessible |
| Favorites | Star toggle on cards; dedicated page with Characters/Houses tabs; empty state with browse links |
| Ambient FX | Light mode: CSS rain animation (90 drops); dark mode: CSS star field (130 particles with twinkle) |
| Ambient sound | Light mode: `sounds/rain.mp3`; dark mode: `sounds/night.mp3`; session toggle in header (muted by default) |
| Page titles | Dynamic `Page \| The 7 Kingdoms` via custom `TitleStrategy` |
| Dark mode | Full light/dark theme via `ThemeService`, persisted to localStorage |
| Responsive | Mobile sidebar drawer + desktop header nav |

## Ambient Sound Setup

Place looping MP3 files in `public/sounds/`:

```
public/sounds/rain.mp3    # rain + thunder loop (light mode)
public/sounds/night.mp3   # night ambience loop (dark mode)
```

Sound is **off by default** on every session. The user enables it via the sound icon in the header. State is not persisted — refreshing the page resets to muted.

## State Management (NgRx)

| Slice | Key |
|---|---|
| Auth | `auth` |
| Books | `books` |
| Characters | `characters` |
| Houses | `houses` |
| Favorites | `favorites` |

Effects use functional `createEffect` with `{ functional: true }`.

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── constants/     # API routes, storage keys, app settings
│   │   ├── guards/        # Auth + guest guards
│   │   ├── interceptors/  # Auth HTTP interceptor
│   │   ├── services/      # http, auth, books, characters, houses, favorites, theme, sound
│   │   ├── strategies/    # AppTitleStrategy
│   │   └── types/         # TypeScript interfaces + Layout type
│   ├── features/
│   │   ├── auth/          # Auth shell + login + signup
│   │   ├── books/         # Books page
│   │   ├── characters/    # Characters page + filters
│   │   ├── commons/       # Header + sidebar
│   │   ├── favorites/     # Favorites page + fav-characters + fav-houses
│   │   ├── home/          # Home shell (ambient FX + sound lifecycle)
│   │   ├── houses/        # Houses page + filters
│   │   └── shared-components/
│   │       ├── character-info/   # Character detail modal
│   │       ├── generic-card/     # Shared list/grid card (characters, houses, favorites)
│   │       ├── house-info/       # House detail modal
│   │       ├── page-pagination/  # Shared pagination bar
│   │       └── page-title/       # Shared page heading with subtitle + slot
│   └── store/
│       ├── auth/
│       ├── books/
│       ├── characters/
│       ├── houses/
│       └── favorites/
└── public/
    ├── sounds/            # rain.mp3 + night.mp3 (add manually)
    ├── svgs/              # Icon set (search, list, grid, chevrons, star, sound…)
    ├── bg.png             # Auth background
    ├── bg2.png            # Home background
    └── logo*.png          # App logos
```

## Typography

Four-tier font system defined in `styles.scss` via Tailwind `@theme`:

| Font | Utility | Usage |
|---|---|---|
| Cinzel | `font-cinzel` | Display headings |
| Lora | `font-lora` | UI chrome (nav, buttons, labels) |
| EB Garamond | `font-garamond` | Body copy |
| Lato | _(body default)_ | Base body font, globally applied |

# ui-the-7-kingdoms

Angular SPA for The 7 Kingdoms app — a Game of Thrones themed explorer for characters, houses, and books from the Ice and Fire universe.

## Tech Stack

- **Framework** — Angular 21 (standalone components, signals)
- **State** — NgRx Store + Effects (functional style)
- **Styling** — Tailwind CSS v4 with custom `@theme` font utilities
- **Testing** — Vitest
- **Fonts** — Cinzel · EB Garamond · Lora (Google Fonts)

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
| Books | Full book list with character count badges |
| Characters | Paginated list, name/gender filters, culture + gender display, detail modal, favorites |
| Houses | Paginated list, name/region filters, coat of arms, detail modal, favorites |
| Favorites | Star toggle on list rows; dedicated page with Characters/Houses tabs; empty state with browse links; detail modal on click |
| Page titles | Dynamic `Page \| The 7 Kingdoms` via custom `TitleStrategy` |
| Dark mode | Full light/dark theme via `ThemeService` |
| Responsive | Mobile sidebar drawer + desktop header nav |

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
│   │   ├── constants/     # API route constants
│   │   ├── guards/        # Auth + guest guards
│   │   ├── interceptors/  # Auth HTTP interceptor
│   │   ├── services/      # HTTP, auth, characters, houses, favorites, theme
│   │   ├── strategies/    # AppTitleStrategy
│   │   └── types/         # TypeScript interfaces
│   ├── features/
│   │   ├── auth/          # Login + signup pages
│   │   ├── books/         # Books page
│   │   ├── characters/    # Characters page + filters + pagination
│   │   ├── commons/       # Header + sidebar
│   │   ├── favorites/     # Favorites page + fav-characters + fav-houses
│   │   ├── home/          # Home shell layout
│   │   └── shared-components/  # character-info + house-info modals
│   └── store/
│       ├── auth/
│       ├── books/
│       ├── characters/
│       ├── houses/
│       └── favorites/
└── public/
    ├── svgs/              # Icon set
    ├── bg.png             # Auth background
    ├── bg2.png            # Home background
    └── logo*.png          # App logos
```

## Typography

Three-tier font system defined in `styles.scss` via Tailwind `@theme`:

| Font | Utility | Usage |
|---|---|---|
| Cinzel | `font-cinzel` | Display headings (h1, h2) |
| Lora | `font-lora` | UI chrome (nav, buttons, labels, tables) |
| EB Garamond | `font-garamond` | Body copy (p, li, blockquote) |

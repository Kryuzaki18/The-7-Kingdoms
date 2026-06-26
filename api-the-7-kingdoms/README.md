# api-the-7-kingdoms

Fastify REST API powering The 7 Kingdoms app. Serves data from the [An API of Ice and Fire](https://anapioficeandfire.com/) and manages user authentication and favorites via an in-memory store.

## Tech Stack

- **Runtime** — Node.js 24
- **Framework** — Fastify 5
- **Language** — TypeScript
- **Auth** — `@fastify/jwt` (httpOnly cookies) + bcrypt
- **Validation** — Zod
- **Process manager** — PM2

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

Server starts on `http://localhost:3000`.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start with hot-reload via `tsx watch` |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled build |
| `npm run typecheck` | Type-check without emitting |
| `npm run pm2:start-local` | Build and start with PM2 |
| `npm run pm2:stop` | Stop PM2 process |
| `npm run pm2:logs` | Stream PM2 logs |
| `npm run pm2:monit` | PM2 monitoring dashboard |

## API Routes

All routes are prefixed with `/api/v1`.

### Auth — `/api/v1/auth`

| Method | Path | Description |
|---|---|---|
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Login and set JWT cookie |
| `POST` | `/logout` | Clear JWT cookie |
| `GET` | `/me` | Get authenticated user |

### Books — `/api/v1/books`

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | List all books (proxied from Ice and Fire API) |
| `GET` | `/:id` | Get a single book |

### Characters — `/api/v1/characters`

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | List characters with pagination (`page`, `pageSize`, `name`, `gender`) |
| `GET` | `/:id` | Get a single character |

### Houses — `/api/v1/houses`

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | List houses with pagination (`page`, `pageSize`, `name`, `region`) |
| `GET` | `/:id` | Get a single house |

### Favorites — `/api/v1/favorites` _(requires auth)_

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Get current user's favorites |
| `POST` | `/characters` | Add a character favorite |
| `DELETE` | `/characters/:id` | Remove a character favorite |
| `POST` | `/houses` | Add a house favorite |
| `DELETE` | `/houses/:id` | Remove a house favorite |

## Environment Variables

```env
JWT_SECRET=your_secret_here
PORT=3000
NODE_ENV=development
```

## Project Structure

```
src/
├── config/         # App routes config
├── constants/      # Auth constants (cookie name, expiry)
├── routes/         # Fastify route handlers
├── schemas/        # Zod validation schemas
├── services/       # Business logic (auth, favorites, proxy)
├── store/          # In-memory user store
├── types/          # TypeScript interfaces
└── server.ts       # Entry point
```

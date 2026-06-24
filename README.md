# The 7 Kingdoms

This repository contains the full-stack project for The 7 Kingdoms.

## Structure

- `api-the-7-kingdoms/` — backend API built with Fastify, TypeScript, and Firebase/MongoDB integration.
- `ui-the-7-kingdoms/` — frontend Angular application.

## Setup

### Backend

```bash
cd api-the-7-kingdoms
npm install
npm run dev
```

### Frontend

```bash
cd ui-the-7-kingdoms
npm install
npm start
```

## Build

### Backend

```bash
cd api-the-7-kingdoms
npm run build
```

### Frontend

```bash
cd ui-the-7-kingdoms
npm run build
```

## Notes

- The backend package includes `tsconfig.json` and uses Node 24 settings.
- The frontend package is an Angular workspace.
- Sensitive files like `.env` and build artifacts are excluded by the root `.gitignore`.

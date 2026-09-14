# multiplos-btoken-web-test

Frontend for the Cartorario/BToken ledger platform (Next.js 16 App Router).

## Prerequisites

- Yarn
- A local env file (`.env` or `.env.local`) defining `NEXT_PUBLIC_BASE_PATH` (see `env.example`). `next.config.ts` throws at startup if it is missing or empty.
- Optionally, `BTOKEN_API_ADDRESS` with the backend base address (defaults to `http://localhost`).

## Getting started

```bash
yarn install
yarn dev
```

Open the dev server URL to see the app.

## Other commands

```bash
yarn build   # production build (runs typecheck)
yarn start   # serve the production build
yarn lint    # ESLint
```

For production HTTPS, `server.cjs` requires `SSL_PRIVATE_KEY`, `SSL_CERTIFICATE`, and `SRVPORT`.

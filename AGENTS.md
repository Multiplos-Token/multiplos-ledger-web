<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Project

Frontend (Next.js 16 App Router, React 19, TS, Tailwind v4) for the Cartorario/BToken ledger platform. Frontend only — all business data comes from remote backend microservices proxied through this app. No tests, no CI.

## Commands & setup

- Package manager is **yarn** (`yarn.lock` present, no other lockfile). `node_modules` is not installed in the repo; run `yarn install` first.
- `.env.local` **must** define `NEXT_PUBLIC_BASE_PATH` — `next.config.ts` throws at startup if it's missing or empty (see `env.example`, value `/home`). Changing it affects every link/asset via `util/*Host.ts` `h()`; keep it consistent.
- `BTOKEN_API_ADDRESS` = server-side backend base for the proxy (default `http://localhost`).
- Commands: `yarn dev`, `yarn build` (this runs the typecheck — there is no separate typecheck script), `yarn start`, `yarn lint` (plain ESLint 9 flat config, **not** `next lint`).
- Verification = `yarn lint` + `yarn build`.

## Architecture

- App Router. Auth guards redirect server-side: `/enduser` → `/login` when logged out, `/login` → `/enduser` when logged in, via `util/ServerHost.isLogged()` (cookie presence).
- Client code never calls the backend directly. `util/ClientHost.c()` POSTs `{route, method, body}` to the generic proxy `app/b2f/call/route.ts`, which forwards to the backend using the `btoken_access_token` httpOnly cookie as a Bearer token (`util/ServerHost.a()` + `BTOKEN_API_ADDRESS`, `import 'server-only'`). `c()` auto-logs-off on 401 unless `onUnauthorizedLogoff: false`.
- Auth routes: `app/b2f/api/user/{login,logoff,refresh,session_status}`. JWT lives in the httpOnly cookie `btoken_access_token`.
- Backend services & route prefixes (see `nginx-backend-test.conf`): `/user-management` (:8080), `/ledger-management` (:8081), `/rwa-management` (:8082), `/financial-management` (:8083). Feature functions using them live in `business/*.tsx`.
- Keep files under `business/` and `util/` as `.tsx` even when they contain no JSX — they are imported by client components.
- `app/TopMenu.tsx` is an empty leftover; the real menus are `app/enduser/TopMenu.tsx` and `app/management/TopMenu.tsx`.

## UI & conventions

- Fluent UI v9 is the primary UI kit (custom brand theme + SSR renderer wired manually in `app/providers.tsx`, relies on the `fluentui-next-appdir-directive` SWC plugin in `next.config.ts` — do not remove it). antd v6 (themed `ConfigProvider` in `providers.tsx`) exists only to fill gaps: prefer Fluent, and use antd only when Fluent lacks the needed component.
- Forms: Formik + Yup with `Yup.setLocale(ptForm)` (`yup-locale-pt`). All user-facing copy is Brazilian Portuguese.
- Tailwind v4 brand tokens via `@theme inline` in `app/globals.css`: `bg-logo-primary` (#182A54), `text-logo-secondary` (#22b354), `bg-background`, plus v4 numeric utilities like `h-178`, `grow-3`.
- Code style: Prettier — no semicolons, single quotes, 2-space, trailing comma `es5`.

## Gotchas

- `business/file.tsx` computes MD5/SHA-256/SHA3 + ascii85 client-side (`hash-wasm`, `@alttiri/base85`, `buffer` polyfill); `app/enduser/Register.tsx` caps uploads at 4MB.
- Production HTTPS runs via `server.cjs` (`next({ dev: false })`) and needs `SSL_PRIVATE_KEY`, `SSL_CERTIFICATE`, `SRVPORT` env vars.
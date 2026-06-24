# Shiva Group Events

Premium luxury event management website for Shiva Group Events (Meerut, North India) — public-facing website, portfolio, services, contact form, and admin CMS.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/shiva-events run dev` — run the frontend (port 18965)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env: `SESSION_SECRET` — Express session secret
- Optional env: `ADMIN_PASSWORD` — Admin panel password (default: `shivaevents2024`)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5 + express-session (session-based admin auth)
- DB: PostgreSQL + Drizzle ORM (tables: portfolio, services, testimonials, leads)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- Frontend: React + Vite + Tailwind v4 + Framer Motion + wouter routing
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/api-client-react/src/generated/` — Generated React Query hooks
- `lib/api-zod/src/generated/` — Generated Zod schemas for server validation
- `lib/db/src/schema/` — Drizzle DB schema (portfolio.ts, services.ts, testimonials.ts, leads.ts)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/shiva-events/src/pages/` — All page components (Home, Portfolio, Services, About, Cities, Contact, admin/*)
- `artifacts/shiva-events/src/components/layout/` — Navbar, Footer
- `artifacts/shiva-events/src/components/admin/AdminLayout.tsx` — Admin sidebar layout

## Architecture decisions

- **Session auth over JWT**: Admin auth uses `express-session` with server-side sessions. Simple enough for a single-admin scenario; no token refresh complexity.
- **Google Fonts in HTML, not CSS**: With Tailwind v4's `@import "tailwindcss"` PostCSS plugin, `@import url(...)` inside CSS triggers a warning because Tailwind inlines content before the font import. Font is loaded via `<link>` in `index.html` instead.
- **Luxury design system**: Gold primary (`#C9A227` / HSL `46 68% 47%`), Playfair Display serif + Inter sans, radius `0` for sharp architectural feel, cream background `#FAF9F6`.
- **Preloader**: First-visit luxury preloader (1.6s) using `sessionStorage` to track visit; skipped on subsequent navigations.
- **API same-origin through proxy**: All API calls use relative paths (`/api/...`); the Replit proxy routes `/api` → port 8080 and `/` → port 18965.

## Product

- **Public website**: Home (hero + stats + portfolio + services + testimonials + CTA), Portfolio (filterable gallery), Services, About, Cities, Contact
- **Lead capture**: Contact form submits to `/api/leads` — captures name, phone, email, event type, location, date, guest count, budget, message
- **Admin CMS** (`/admin`): Session-authenticated dashboard with lead management (status tracking), portfolio CRUD, testimonials CRUD
- **Seed data**: 6 portfolio items, 6 services, 5 testimonials pre-seeded

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After changing DB schema, run `pnpm --filter @workspace/db run push` then restart the API server workflow.
- After changing OpenAPI spec, run `pnpm --filter @workspace/api-spec run codegen` to regenerate hooks/schemas.
- Google Fonts are loaded via `<link>` in `artifacts/shiva-events/index.html`, NOT via CSS `@import`.
- Admin password defaults to `shivaevents2024`; override with `ADMIN_PASSWORD` env var.
- TypeScript: Express async route handlers need explicit `: Promise<void>` return type annotation; early-exit patterns use `{ res.xxx(); return; }` not `return res.xxx()`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

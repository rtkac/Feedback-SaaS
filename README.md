# Feedback SaaS

A full-stack SaaS platform for collecting and managing user feedback. Built as a [Turborepo](https://turbo.build/repo) monorepo, powered by [Bun](https://bun.sh/).

---

## Workspace Layout

```
apps/
  auth-web/       # Authentication portal (sign-in, sign-up, password reset)
  admin-web/      # Customer dashboard for managing feedback
  marketing/      # Public marketing website                        [upcoming]
  feedback/       # Embeddable feedback widget for client websites  [upcoming]
  storybook/      # UI component catalogue

packages/
  @feedback-saas/auth    # Better Auth configuration, server events, email via Resend
  @feedback-saas/db      # Drizzle ORM schema, queries, migrations (Neon PostgreSQL)
  @feedback-saas/ui      # Shared React component library (coss ui built on top of Base UI and style with Tailwind v4)
  @feedback-saas/utils   # Shared utility functions
```

---

## Tech Stack

<p>
  <img src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
  <img src="https://img.shields.io/badge/Turborepo-%23EF4444.svg?style=for-the-badge&logo=turborepo&logoColor=white" alt="Turborepo" />
  <img src="https://img.shields.io/badge/React_19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TanStack_Start-%23FF4154.svg?style=for-the-badge" alt="TanStack Start" />
  <img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_v4-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Drizzle-%23C5F74F.svg?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/Neon-%2300E5BF.svg?style=for-the-badge" alt="Neon" />
  <img src="https://img.shields.io/badge/Better_Auth-%231F2A33.svg?style=for-the-badge" alt="Better Auth" />
  <img src="https://img.shields.io/badge/Oxlint-%231F2A33.svg?style=for-the-badge" alt="Oxlint" />
</p>

| Layer                     | Choice                                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Runtime / Package manager | [Bun](https://bun.sh/)                                                                                            |
| Monorepo orchestration    | [Turborepo](https://turbo.build/repo)                                                                             |
| Framework                 | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router)                     |
| Data fetching             | [TanStack Query](https://tanstack.com/query)                                                                      |
| Forms                     | [TanStack Form](https://tanstack.com/form)                                                                        |
| Database                  | [Drizzle ORM](https://orm.drizzle.team/) + [Neon](https://neon.tech/) (serverless Postgres)                       |
| Authentication            | [Better Auth](https://better-auth.com/) + [Resend](https://resend.com/)                                           |
| UI components             | [Base UI](https://base-ui.com/) + [shadcn/ui](https://ui.shadcn.com/), styled with [coss ui](https://coss.com/ui) |
| Styling                   | [Tailwind CSS v4](https://tailwindcss.com/)                                                                       |
| Icons                     | [Tabler Icons](https://tabler.io/icons)                                                                           |
| i18n                      | [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)                                          |
| Error monitoring          | [Sentry](https://sentry.io/)                                                                                      |
| Testing                   | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)                                   |
| Linting / Formatting      | [Oxlint](https://oxc.rs/docs/guide/usage/linter) + [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)             |
| Git hooks                 | [Lefthook](https://github.com/evilmartians/lefthook) + [Commitlint](https://commitlint.js.org/)                   |

---

## Getting Started

**Prerequisite:** [Bun](https://bun.sh/) ≥ 1.3.14

```bash
# Install Bun if you don't have it
curl -fsSL https://bun.sh/install | bash

# Clone and install dependencies
git clone <repo-url> && cd feedback-saas
bun install
```

Copy the environment variables template and fill in the required values:

```bash
cp .env.example .env
```

Required environment variables:

| Variable                           | Description                                |
| ---------------------------------- | ------------------------------------------ |
| `DATABASE_URL`                     | Neon PostgreSQL connection string          |
| `BETTER_AUTH_SECRET`               | Random secret for session signing          |
| `BETTER_AUTH_URL`                  | Auth server base URL                       |
| `BETTER_AUTH_TRUSTED_ORIGINS`      | Comma-separated allowed origins            |
| `RESEND_API_KEY`                   | Resend API key for transactional email     |
| `VITE_FEEDBACK_SAAS_AUTH_WEB_URL`  | Public URL of the auth app                 |
| `VITE_FEEDBACK_SAAS_ADMIN_WEB_URL` | Public URL of the admin app                |
| `VITE_APP_ENV`                     | `development` \| `staging` \| `production` |

Push the schema to your database:

```bash
bun run --filter=@feedback-saas/db db:push
```

Optionally seed development data:

```bash
bun run seed
```

---

## Development

Start all apps and watch all packages simultaneously:

```bash
bun run dev
```

Start a specific app only:

```bash
bun run dev --filter=@feedback-saas/admin-web
bun run dev --filter=@feedback-saas/auth-web
bun run dev --filter=@feedback-saas/storybook
```

| App         | Default port |
| ----------- | ------------ |
| `auth-web`  | `3000`       |
| `admin-web` | `3001`       |
| `storybook` | `6006`       |

---

## Common Commands

```bash
# Build everything
bun run build

# Run all tests
bun run test

# Lint the workspace
bun run lint

# Check formatting
bun run format

# Auto-fix formatting
bun run format:write

# Open Drizzle Studio
bun run --filter=@feedback-saas/db db:studio

# Generate a new DB migration
bun run --filter=@feedback-saas/db db:generate

# Storybook (component catalogue)
bun run dev --filter=@feedback-saas/storybook
```

---

## Adding UI Components

Shared components live in `packages/ui` and are styled with [coss ui](https://coss.com/ui), using [Base UI](https://base-ui.com/) primitives.

Install a component from the coss ui registry via the shadcn CLI, run from the repo root:

```bash
bunx --bun shadcn@latest add @coss/button -c packages/ui
```

---

## Deployment

All apps are hosted on [Vercel](https://vercel.com/) and deploy automatically on every push — no manual steps needed.

| App         | Branch → Environment                            |
| ----------- | ----------------------------------------------- |
| `auth-web`  | `main` → production, any other branch → preview |
| `admin-web` | `main` → production, any other branch → preview |
| `marketing` | `main` → production, any other branch → preview |
| `feedback`  | `main` → production, any other branch → preview |
| `storybook` | `main` → production, any other branch → preview |

Vercel automatically picks up the Turborepo config and only rebuilds apps affected by a given change. Preview deployments get a unique URL per branch, making it easy to share work-in-progress without touching production.

> Database migrations are **not** run automatically on deploy. Run `bun run --filter=@feedback-saas/db db:push` (or `db:generate` + `db:migrate`) manually before deploying schema changes.

---

## Git Conventions

Commits are linted against [Conventional Commits](https://www.conventionalcommits.org/) via Commitlint. Lefthook runs formatting and linting on staged files before every commit.

```
feat: add feedback widget embed script
fix: resolve session expiry race condition
chore: bump drizzle-orm to 0.45
```

## Database & Auth Schema

### Updating the Better Auth schema

Run this whenever you upgrade `better-auth` or change its configuration in `packages/auth/src/index.ts`:

```bash
cd packages/db
bun x auth@latest generate --config=../auth/src/index.ts --output=./src/schema
```

This regenerates `packages/db/src/schema/auth-schema.ts` to match the current Better Auth config. After this, follow the steps in [Pushing schema changes to Neon](#pushing-schema-changes-to-neon).

> **Prerequisite:** `packages/db` must have a `.env` file with `DATABASE_URL` and `BETTER_AUTH_URL` set.

---

### Pushing schema changes to Neon

After updating any schema file under `packages/db/src/schema/`, apply the changes to the database and rebuild the package:

```bash
# 1. Push schema changes to Neon
cd packages/db && bun run db:push

# 2. Rebuild the db package so the updated schema is picked up at runtime
bun run --filter=@feedback-saas/db build
```

Then restart the dev server.

> **`db:push` vs `db:generate`:** These are two separate Drizzle workflows — do not mix them.
>
> - `db:push` diffs the schema directly against the DB and applies changes. No migration files needed or used.
> - `db:generate` + `db:migrate` generates SQL migration files and runs them — use this for production deployments where migration history matters.
>
> For day-to-day development, `db:push` alone is sufficient.

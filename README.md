# Landing - Marketing Website

A monorepo for the main marketing website built with Next.js and Tailwind CSS.

## Useful links

- [Figma](https://www.figma.com/design/pvAFtnn5S99Pz3NYtzFmX5/Website--GRX-Pay-?node-id=53-47905&m=dev)

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

This will start all apps in development mode.

### Build

```bash
pnpm build
```

### Project Structure

```
landing/
├── apps/
│   └── web/          # Main Next.js marketing website
├── packages/         # Shared packages (components, utils, etc.)
├── turbo.json        # Turborepo configuration
└── pnpm-workspace.yaml
```

## Available Scripts

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps
- `pnpm start` - Start all apps in production mode
- `pnpm lint` - Lint all apps
- `pnpm type-check` - Type check all apps

## Deployment (Cloudflare Pages, dev)

The site is deployed to **Cloudflare Pages** (Next.js static export). Dev URL: **https://website.nyx-dev.com**.

**Why `output: "export"` and `images: { unoptimized: true }` in `next.config.ts`?**  
Cloudflare Pages serves static files only. Next.js must produce the `out/` folder (HTML/JS/CSS); without `output: "export"` it builds for Node (SSR), which Pages cannot serve. These options are required for this deploy; remove them if you switch back to e.g. K8s with an SSR container.

- **Deploy**: automatically on merge to `master` (GitHub Actions).
- **Architecture**: static build → Cloudflare Pages (edge CDN). R2 is not needed for static assets; use R2 only for large media or shared storage across projects.

### One-time setup

1. **Cloudflare**  
   Create a Pages project named `public-web-dev` (or run `npx wrangler pages project create public-web-dev`). Custom domain and DNS are managed via Terraform (see terraform-configurations-nyx-dev).

2. **GitHub**  
   In this repo: Settings → Secrets and variables → Actions, add:
   - `CLOUDFLARE_ACCOUNT_ID` — Account ID (Cloudflare Dashboard → overview).
   - `CLOUDFLARE_PAGES_EDIT_API_TOKEN` — API token with **Cloudflare Pages: Edit** (e.g. from Bitwarden).

### Local / manual deploy

```bash
pnpm build
npx wrangler pages deploy apps/web/out --project-name=public-web-dev
```

Run `npx wrangler login` first. CI uses secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_PAGES_EDIT_API_TOKEN`.

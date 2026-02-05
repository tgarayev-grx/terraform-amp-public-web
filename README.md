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

## Deployment (dev: K8s + Argo CD)

The site is deployed to the **dev Kubernetes cluster** like other services (e.g. Kuna.Pro). Dev URL: **https://website.nyx-dev.com** (private Istio ingress).

- **Build**: GitHub Actions on `ubuntu-arm-2204-kuna` runners on push to `master`.
- **Image**: AWS ECR (`nyx-playground/public-web`). One repo; dev tags like `a1b2c3d4-arm`, prod tags e.g. `a1b2c3d4-arm-prod`. Static export is built in Docker, then served by nginx in the image.
- **Manifests**: GitOps in [gitops.dev](https://github.com/NYX-ENGINEERS/gitops.dev) — `infrastructure/public-web/` (Deployment, Service, Istio Gateway/VirtualService).
- **Domain**: `website.nyx-dev.com` is configured as **private Istio** in [terraform-configurations-nyx-dev](https://github.com/NYX-ENGINEERS/terraform-configurations-nyx-dev) (`ingress-and-dns/locals.tf`, key `website`).
- **Argo CD**: App `public-web-dev` in gitops.dev (`infrastructure/apps/app-public-web.yaml`). CI pushes a new image tag to gitops and optionally runs `argocd app sync public-web-dev`.

### Why `output: "export"` and `images: { unoptimized: true }` in `next.config.ts`?

We run a **static export** in the cluster: the Dockerfile builds the app, copies `apps/web/out` into an nginx image, and nginx serves the files. So Next.js must produce the `out/` folder; without `output: "export"` it would build for Node (SSR), which this setup does not use.

### GitHub Actions secrets (public-web repo)

- `INFRA_ECR_AWS_DEFAULT_REGION` — ECR region (e.g. `eu-central-1`).
- `INFRA_ECR_AWS_ACCESS_KEY_ID` — AWS access key for ECR.
- `INFRA_ECR_AWS_SECRET_ACCESS_KEY` — AWS secret key for ECR.
- `INFRA_ECR_REGISTRY` — ECR registry URL (e.g. `983741981862.dkr.ecr.eu-central-1.amazonaws.com`).
- `PLAT13748_SUPERMAN` — GitHub token with write access to **gitops.dev** (for updating image tag).
- `ARGO_TOKEN_DEV` — (optional) Argo CD token for `argocd app sync public-web-dev` after deploy.

### Local build and run (Docker)

```bash
pnpm build
docker build -f Dockerfile -t public-web:local .
docker run -p 8080:80 public-web:local
```

Open http://localhost:8080.

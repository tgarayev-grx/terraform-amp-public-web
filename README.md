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
- **Image**: AWS ECR (`nyx-playground/public-web`). One repo; dev tags like `a1b2c3d4-arm`, prod tags e.g. `a1b2c3d4-arm-prod`. Next.js standalone build runs via Node.js server (port 80).
- **Manifests**: GitOps in [gitops.dev](https://github.com/NYX-ENGINEERS/gitops.dev) — `infrastructure/public-web/` (Deployment, Service, Istio Gateway/VirtualService).
- **Domain**: `website.nyx-dev.com` is configured as **private Istio** in [terraform-configurations-nyx-dev](https://github.com/NYX-ENGINEERS/terraform-configurations-nyx-dev) (`ingress-and-dns/locals.tf`, key `website`).
- **Argo CD**: App `public-web-dev` in gitops.dev (`infrastructure/apps/app-public-web.yaml`). CI pushes a new image tag to gitops and optionally runs `argocd app sync public-web-dev`.

### Why `output: "standalone"` and `images: { unoptimized: true }` in `next.config.ts`?

We run a **Node.js server** in the cluster: the Dockerfile builds the app with `output: "standalone"`, copies the minimal standalone output, and runs `node server.js`. The server listens on port 80. `images: { unoptimized: true }` avoids runtime image optimization (no sharp/squoosh in container).

### GitHub Actions secrets (public-web repo)

- `INFRA_ECR_AWS_DEFAULT_REGION` — ECR region (e.g. `eu-central-1`).
- `INFRA_ECR_AWS_ACCESS_KEY_ID` — AWS access key for ECR.
- `INFRA_ECR_AWS_SECRET_ACCESS_KEY` — AWS secret key for ECR.
- `PLAT13748_SUPERMAN` — GitHub token with write access to **gitops.dev** (for updating image tag).
- `ARGO_TOKEN_DEV` — (optional) Argo CD token for `argocd app sync public-web-dev` after deploy.
- **Prod:** `ARGO_TOKEN_PROD`, `ARGOCD_SERVER_PROD` — for `argocd app sync public-web-prod` after prod deploy.

ECR registry URL is derived from `aws sts get-caller-identity` + region (no `INFRA_ECR_REGISTRY` needed).

## Deploy to production

Production uses the same ECR repo and GitOps flow as dev; the image tag suffix is `-arm-prod` and manifests live in [gitops.prod](https://github.com/NYX-ENGINEERS/gitops.prod).

1. **Create a release branch** from `master`:
   - Name: `release/{release-date}-{count-today}`
   - Example: `release/04.03.2025-1`

2. **Open a Pull Request** from that branch into the **`prod`** branch.

3. **CI runs on the PR** (`.github/workflows/deploy-prod.yml` and `test-changes.yml`):
   - **Tests** (same as dev): build packages and run tests (`.github/workflows/test-changes.yml`, triggered on PR to `prod`).
   - **Build and push**: build the image and push to ECR with tag `{sha}-arm-prod` (`.github/workflows/deploy-prod.yml`).

4. **Get approval and resolve conflicts**, then **merge into `prod`**.

5. **After merge**: the workflow runs again on push to `prod`: builds the image for the merged commit, updates `infrastructure/public-web/deployment.yaml` in **gitops.prod** with the new image tag, commits and pushes, then runs `argocd app sync public-web-prod`.

**Requirements:** branch `prod` must exist; gitops.prod must have `infrastructure/public-web/deployment.yaml` and the Argo CD app `public-web-prod`. Configure branch protection on `prod` so that “Test changes” and “Build and deploy to prod” (or at least tests) must pass before merging.
### Local build and run (Docker)

```bash
pnpm build
docker build -f Dockerfile -t public-web:local .
docker run -p 8080:80 public-web:local
```

Open http://localhost:8080.

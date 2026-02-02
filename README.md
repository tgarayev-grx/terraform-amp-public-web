# Landing - Marketing Website

A monorepo for the main marketing website built with Next.js and Tailwind CSS.

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

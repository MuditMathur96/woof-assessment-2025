# Resume Analyzer

A full-stack application built with Express.js/tRPC and React, organized as a monorepo  allows users to upload job description and candidate resumes/CV as pdf. The files are then analyzed and compared by AI to check the eligibility and matching criteria to finally declare whether the candidate a good fit or not.

## Prerequisites

* Node.js 22 or higher
* pnpm (recommended package manager)

## Project Structure

```
├── apps/
│   ├── server/          # Express.js backend application
│   └── client/          # React frontend application
├── packages/            # Shared packages and utilities
└── package.json         # Root package.json with workspace configuration
```

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MuditMathur96/woof-assessment-2025
cd woof-assessment-2025
```

2. Install dependencies:

```bash
pnpm install
```

### Development

#### Setup Environment

Refer to env.sample file for environment variables insider apps/server folder

#### Running Individual Applications

**Server (Express.js):**

```bash
pnpm run dev:server
```

**Client (React):**

```bash
pnpm run dev:client
```

#### Running Both Applications Simultaneously

To run both the server and client applications at the same time:

```bash
pnpm -r run dev
```

This command will start both applications in parallel, allowing you to develop the full-stack application with hot reload capabilities.

## Applications

### Server (`apps/server`)

* **Technology:** Express.js
* **Purpose:** Backend API server
* **Development:** `pnpm run dev:server`

### Client (`apps/client`)

* **Technology:** React
* **Purpose:** Frontend user interface
* **Development:** `pnpm run dev:client`

## Packages (`packages/`)

Shared packages and utilities used across the applications.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---
description: Quarkus Quinoa Angular Demo - Full-stack application with Quarkus REST backend and Angular SPA frontend
applyTo: "**"
---

# Quarkus Quinoa Angular Demo

## Project Overview

This is a full-stack web application combining:
- **Backend**: Quarkus 3.33 LTS with quarkus-rest and Jackson for JSON serialization
- **Frontend**: Angular 22 SPA integrated via Quarkus Quinoa
- **Build**: Maven (backend) + pnpm (frontend)

## Project Structure

```
├── pom.xml                          # Maven project (Quarkus backend)
├── src/main/java/com/example/      # Java REST resources
├── src/main/resources/             # Quarkus configuration
│   └── application.properties
├── src/main/webui/                 # Angular SPA (managed by Quinoa)
│   ├── angular.json
│   ├── package.json
│   ├── proxy.conf.json
│   └── src/                        # Angular source code
└── src/test/java/com/example/     # Java tests
```

## Key Technologies & Versions

- Quarkus: 3.33.1 (LTS)
- Quarkus Quinoa: 2.8.3
- Angular: 22.x (latest LTS)
- Node.js: 24.x
- pnpm: 11.x
- Java: 21+
- Maven: 3.9+

## Development Commands

- `mvn quarkus:dev` — Start Quarkus in dev mode (auto-starts Angular dev server via Quinoa)
- `cd src/main/webui && pnpm start` — Start Angular dev server standalone
- `mvn package` — Build production JAR (includes built Angular assets)
- `mvn test` — Run backend tests

## REST API

All backend REST endpoints are under `/api/`:
- `GET /api/greeting` — Returns a greeting JSON

## Quinoa Integration

Quinoa is configured in `application.properties`:
- Package manager: pnpm
- Build output directory: `dist/webui/browser`
- SPA routing enabled (Angular routes handled client-side)
- Dev server port: 4200

## Coding Conventions

### Backend (Java)
- Use Jakarta EE annotations (`jakarta.ws.rs.*`)
- Records for DTOs
- JAX-RS resource classes annotated with `@Path`

### Frontend (Angular/TypeScript)
- Standalone components (no NgModules)
- Use `inject()` function for dependency injection
- Angular control flow syntax (`@if`, `@for`)
- HttpClient for API calls

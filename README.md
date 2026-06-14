# Quarkus Quinoa Angular Demo

A full-stack web application combining a **Quarkus 3.33 LTS** REST backend with an **Angular 22** SPA frontend, integrated via **Quarkus Quinoa**.

## Quick Start

```bash
# Start in dev mode (both backend and frontend)
mvn quarkus:dev
```

Then open http://localhost:8080 in your browser.

## Tech Stack

| Layer    | Technology         | Version  |
|----------|--------------------|----------|
| Backend  | Quarkus (REST)     | 3.33.1   |
| JSON     | Jackson            | (managed)|
| Frontend | Angular            | 22.x     |
| SPA Glue | Quarkus Quinoa    | 2.8.3    |
| Pkg Mgr  | pnpm              | 11.x     |
| Build    | Maven              | 3.9+     |
| Java     | JDK                | 21+      |

## Project Structure

```
├── pom.xml                         # Maven build (Quarkus backend)
├── src/main/java/com/example/      # Java REST resources
│   ├── Greeting.java               # DTO record
│   └── GreetingResource.java       # JAX-RS endpoint
├── src/main/resources/
│   └── application.properties      # Quarkus + Quinoa config
├── src/main/webui/                 # Angular SPA (Quinoa managed)
│   ├── angular.json
│   ├── package.json
│   └── src/                        # Angular source
├── src/test/java/com/example/      # Backend tests
└── .github/
    └── copilot-instructions.md     # AI agent instructions
```

## Development

### Prerequisites

- Java 21+
- Maven 3.9+
- Node.js 24+
- pnpm 11+ (`npm install -g pnpm`)

### Dev Mode

```bash
mvn quarkus:dev
```

This starts:
- Quarkus backend on port 8080
- Angular dev server on port 4200 (proxied via Quinoa)

### Production Build

```bash
mvn package
```

The resulting JAR in `target/` includes the built Angular assets.

### Frontend Only

```bash
cd src/main/webui
pnpm install
pnpm start
```

### Run Tests

```bash
# Backend tests
mvn test

# Frontend tests
cd src/main/webui
pnpm test
```

## REST API

| Method | Path            | Description         |
|--------|-----------------|---------------------|
| GET    | `/api/greeting` | Returns a greeting  |

Example response:
```json
{ "message": "Hello from Quarkus REST!" }
```

## How This Project Was Created

This project was created using the following steps:

### 1. Maven POM (Backend)

The `pom.xml` was created manually targeting **Quarkus 3.33.1 LTS** (the latest LTS release as of June 2026) with the following extensions:

- `io.quarkus:quarkus-rest` — JAX-RS REST endpoints (formerly RESTEasy Reactive)
- `io.quarkus:quarkus-rest-jackson` — Jackson JSON serialization for REST
- `io.quarkiverse.quinoa:quarkus-quinoa:2.8.3` — SPA integration (serves Angular from Quarkus)
- `io.quarkus:quarkus-arc` — CDI dependency injection
- `io.quarkus:quarkus-junit5` + `io.rest-assured:rest-assured` — testing

The Quarkus BOM (`io.quarkus.platform:quarkus-bom:3.33.1`) manages dependency versions.

### 2. Angular SPA (Frontend)

The Angular frontend was scaffolded inside `src/main/webui/` using:

```powershell
cd src/main
pnpm dlx @angular/cli@latest new webui --package-manager=pnpm --style=css --routing --ssr=false --skip-git
```

This created an **Angular 22** application (latest LTS) with:
- pnpm as the package manager
- CSS for styles (no preprocessor)
- Client-side routing enabled
- No SSR (single-page app only)
- No separate git repo (managed by the parent project)

### 3. Quinoa Configuration

In `src/main/resources/application.properties`:

```properties
quarkus.quinoa.package-manager=pnpm
quarkus.quinoa.build-dir=dist/webui/browser
quarkus.quinoa.enable-spa-routing=true
quarkus.quinoa.dev-server.port=4200
quarkus.quinoa.dev-server.check-timeout=60000
```

This tells Quinoa to:
- Use pnpm to install dependencies and build the Angular app
- Look for build output in `dist/webui/browser` (Angular's default output path)
- Enable SPA routing (return `index.html` for unknown routes)
- Connect to Angular's dev server on port 4200 during `quarkus:dev`

### 4. REST Resource

A simple `GreetingResource` was created at `/api/greeting` using a Java record DTO and Jakarta REST annotations.

### 5. Angular Integration

The Angular `App` component was modified to:
- Use `HttpClient` to call `GET /api/greeting`
- Display the greeting message using Angular's `@if` control flow and `AsyncPipe`
- Provide `HttpClient` via `provideHttpClient()` in `app.config.ts`

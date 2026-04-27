# Team Up

Team Up is a platform where students and learners find teammates and build projects together. People create projects, list the skills they need, and others can apply or get invited to join the team.

## What's in this repo

This is a monorepo with two parts:

- **[frontend/](frontend/)** — React 19 + TypeScript + Vite client. UI for sign-up, dashboard, project creation, profiles, community and notifications.
- **[backend/](backend/)** — Node.js + Express + TypeScript REST API on top of PostgreSQL (Neon). Handles users, projects, skills, interests and notifications.

Authentication is done with **Firebase Auth** on the client; the backend verifies the Firebase ID token on every request.

## Getting started

You'll need:

- **Node.js 20+** and **npm**
- A **PostgreSQL** database (the project uses [Neon](https://neon.tech/), but any Postgres works)
- A **Firebase** project for authentication

Each part of the app runs separately. Open two terminals — one for the backend, one for the frontend.

### Backend

```bash
cd backend
npm install
npm run dev
```

Detailed setup, environment variables and the list of API endpoints live in [backend/README.md](backend/README.md).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Detailed setup and environment variables for the client are in [frontend/README.md](frontend/README.md).

By default the frontend expects the backend at `http://localhost:3000` — make sure both are running.

## Repo layout

```
team-up/
├── frontend/   # React client (see frontend/README.md)
├── backend/    # Express API (see backend/README.md)
└── README.md   # You are here
```

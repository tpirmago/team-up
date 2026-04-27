# Team Up — Frontend

The web client for Team Up. For an overview of the whole project see the [root README](../README.md).

Built with **React 19**, **TypeScript**, **Vite**, **MUI** and **Firebase Auth**.

## Getting started

You'll need **Node.js 20+** and **npm**. The app also expects a running [Team Up backend](../backend/README.md) and a Firebase project for authentication.

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `frontend/` folder:

```env
VITE_API_URL=http://localhost:3000

VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxx
```

Firebase values come from your project settings in the [Firebase Console](https://console.firebase.google.com/). `VITE_API_URL` should point to the backend you're running locally (or a deployed one).

### 3. Run the dev server

```bash
npm run dev
```

Vite will print a local URL — open it in your browser and you should see the login screen.

## Useful scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot reload     |
| `npm run build`   | Type-check and build a production bundle      |
| `npm run preview` | Preview the production build locally          |
| `npm run lint`    | Run ESLint over the codebase                  |
| `npm test`        | Run the Vitest test suite                     |

## Project layout

```
src/
├── components/   # Reusable UI: Header, Sidebar, Button, etc.
├── pages/        # Top-level views: Login, Dashboard, Profile, Projects
├── hooks/        # Custom React hooks
├── config/       # API base URL and other config
├── theme/        # MUI theme and shared styles
├── types/        # Shared TypeScript types
├── utils/        # Helpers
├── firebase.ts   # Firebase initialization
└── App.tsx       # Routing and auth state
```

## Notes

- Styling is done with CSS Modules (`*.module.css`) alongside MUI components.
- If something doesn't load, the first thing to check is usually the `.env` file and that the backend is reachable at `VITE_API_URL`.

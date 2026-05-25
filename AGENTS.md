# AGENTS.md

## Cursor Cloud specific instructions

### Project Overview

PrepWise is a full-stack study planning app (React + Express) that uses a 0/1 knapsack dynamic programming algorithm to optimize which exam topics to study given limited hours. No database required — all computation is in-memory per request.

### Services

| Service | Directory | Command | URL |
|---------|-----------|---------|-----|
| Backend (Express API) | `prepwise/backend` | `npm run dev` | http://localhost:5000 |
| Frontend (React + Vite) | `prepwise/frontend` | `npm run dev` | http://localhost:5173 |

### Running the app

Start backend first, then frontend (in separate terminals):

```bash
cd prepwise/backend && npm run dev
cd prepwise/frontend && npm run dev
```

The frontend connects to the backend at `http://localhost:5000` by default (configurable via `VITE_API_URL` env var in `prepwise/frontend/.env`).

### Testing the API

```bash
curl -s http://localhost:5000/api/health
curl -s -X POST http://localhost:5000/api/optimize-study-plan \
  -H "Content-Type: application/json" \
  -d '{"examName":"Test","examDate":"2026-06-10","totalHours":10,"topics":[{"name":"Topic A","estimatedHours":3,"importance":5,"difficulty":4,"confidence":2}]}'
```

### Build

```bash
cd prepwise/frontend && npm run build
```

### Known issues

- The frontend `TopicForm.jsx` `handleChange` function only converts values to `Number` when `event.target.type === 'number'`. Select elements (`importance`, `difficulty`, `confidence`) have type `"select-one"`, so their values are stored as strings. The backend validation (`Number.isInteger`) rejects string values. This means generating a study plan via the UI will fail unless the select values happen to pass validation. The API works correctly when called directly with integer values (e.g. via curl).

### Notes

- No linting or test framework is configured in this repo.
- Backend uses `node --watch` for hot-reload (Node.js built-in file watcher).
- Frontend uses Vite's HMR for hot-reload.
- No authentication, no database, no external service dependencies.

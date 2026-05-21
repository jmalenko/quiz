# Implementation Detailed — Frontend

> *AI-generated — expanded from [../IMPLEMENTATION.md](../IMPLEMENTATION.md) and [../../05-design_definition/detailed/DESIGN_FRONTEND.md](../../05-design_definition/detailed/DESIGN_FRONTEND.md)*

## File Structure

```
containers/frontend/
├── package.json
├── vite.config.js
├── Dockerfile
├── .eslintrc.json
├── index.html
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── components/
    │   ├── QuestionCard.jsx
    │   ├── AnswerButton.jsx
    │   ├── Feedback.jsx
    │   └── ScoreSummary.jsx
    ├── api/
    │   └── quizApi.js
    └── generated/
        └── (OpenAPI-generated DTOs)
```

## Build Configuration — package.json

### Dependencies
- `react` 18.3
- `react-dom` 18.3

### Dev Dependencies
- `vite`
- `@vitejs/plugin-react`
- `eslint`
- `eslint-config-airbnb`
- `@openapitools/openapi-generator-cli`

### Scripts
- `dev` — `vite` (development server)
- `build` — `vite build` (production build)
- `lint` — `eslint src/`
- `generate-api` — runs OpenAPI generator to produce DTOs from `openapi.yml`

## Vite Configuration

- React plugin enabled
- Proxy `/api` → `http://localhost:8080` (development only)
- Build output: `dist/`

## Component Specifications

### main.jsx
- React entry point
- Renders `<App />` into `#root`

### App.jsx
- Root component, manages all quiz state:
  - `questions` — loaded from API on mount
  - `currentIndex` — tracks current question
  - `selectedOption` — player's selection
  - `feedback` — response from POST /api/answers
  - `score` — running total
  - `finished` — quiz complete flag
- Uses `useEffect` for initial data fetch
- Uses `useState` for all state
- Conditionally renders: QuestionCard + Feedback, or ScoreSummary

### QuestionCard.jsx
- Props: `question`, `onSelect`, `disabled`
- Renders question text and maps `question.options` to AnswerButton components
- Disabled after answer submitted (prevents double-click)

### AnswerButton.jsx
- Props: `text`, `index`, `selected`, `correct`, `wrong`, `onClick`
- Renders a single option button
- Visual states: default, selected, correct (green), wrong (red)
- Calls `onClick(index)` on click

### Feedback.jsx
- Props: `correct`, `correctOption`, `onNext`
- Shows "Correct!" or "Wrong — the answer was: {correctOption}"
- "Next" button calls `onNext`

### ScoreSummary.jsx
- Props: `score`, `total`
- Displays final score: "You got {score} out of {total}"

### api/quizApi.js
- `fetchQuestions()` — GET /api/questions → returns question array
- `submitAnswer(questionId, selectedOption)` — POST /api/answers → returns answer response
- Uses `fetch` API (no external HTTP library)

## ESLint Configuration
- Extends `airbnb`
- React-specific rules enabled
- JSX in `.jsx` files

## Dockerfile

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

## nginx Configuration

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location /api/ {
        proxy_pass http://backend:8080;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

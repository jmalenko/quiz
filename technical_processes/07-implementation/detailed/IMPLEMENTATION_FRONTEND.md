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
    ├── generated/
    │   └── (OpenAPI-generated DTOs)
    └── __tests__/
        ├── App.test.jsx
        ├── QuestionCard.test.jsx
        ├── AnswerButton.test.jsx
        ├── Feedback.test.jsx
        ├── ScoreSummary.test.jsx
        └── quizApi.test.js
```

## Build Configuration — package.json

### Dependencies
- `react` 18.3
- `react-dom` 18.3

### Dev Dependencies
- `vite`
- `@vitejs/plugin-react`
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jsdom` — browser environment for Vitest
- `eslint`
- `eslint-config-airbnb`
- `@openapitools/openapi-generator-cli`

### Scripts
- `dev` — `vite` (development server)
- `build` — `vite build` (production build)
- `test` — `vitest run` (unit tests, single pass)
- `test:watch` — `vitest` (watch mode)
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

## Unit Test Specifications

### App.test.jsx
- Mocks: `quizApi` module (fetchQuestions, submitAnswer)
- Tests:
  - Renders a `QuestionCard` after questions load
  - Selecting an option calls `submitAnswer` with correct arguments
  - Correct feedback is shown after answer submission
  - "Next" advances to the next question
  - `ScoreSummary` is shown after the last question is answered

### QuestionCard.test.jsx
- Tests:
  - Renders the question text
  - Renders one `AnswerButton` per option
  - Passes `disabled` prop to all buttons when disabled

### AnswerButton.test.jsx
- Tests:
  - Renders the option text
  - Calls `onClick` with the correct index when clicked
  - Applies correct CSS class when `correct` prop is true
  - Applies wrong CSS class when `wrong` prop is true
  - Does not call `onClick` when `disabled`

### Feedback.test.jsx
- Tests:
  - Shows "Correct!" when `correct` is true
  - Shows wrong answer message with `correctOption` text when `correct` is false
  - "Next" button calls `onNext`

### ScoreSummary.test.jsx
- Tests:
  - Displays score and total correctly

### quizApi.test.js
- Mocks: global `fetch`
- Tests:
  - `fetchQuestions()` calls `GET /api/questions` and returns parsed JSON
  - `submitAnswer()` calls `POST /api/answers` with correct body and returns parsed JSON

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

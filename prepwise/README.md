# PrepWise

PrepWise is a full-stack study planning app that helps students decide which exam topics to prioritize when study time is limited. It uses a dynamic programming algorithm inspired by the 0/1 knapsack problem to choose the combination of topics with the highest total priority score.

## Problem Statement

Students often have more material to review than time available before an exam. PrepWise turns that trade-off into an optimization problem:

- Study hours are the limited capacity.
- Each topic has a time cost.
- Each topic has a priority value based on importance, difficulty, and confidence.
- The app selects the highest-value set of topics that fits within the available hours.

## Features

- Enter exam name, exam date, and available study hours
- Add study topics with estimated hours, importance, difficulty, and confidence ratings
- Generate an optimized study plan from the backend
- View selected topics, skipped topics, suggested hours, total priority score, and remaining hours
- Read plain-language explanations for why topics were selected

## Tech Stack

- Frontend: React.js with Vite
- Backend: Node.js with Express
- Styling: CSS
- Algorithm: Dynamic programming / 0/1 knapsack-style optimization
- Data Storage: In-memory request data only

## How the Dynamic Programming Algorithm Works

PrepWise calculates a priority score for each topic:

```text
priorityScore = (importance * 3) + (difficulty * 2) + ((6 - confidence) * 2)
```

This formula gives the most weight to exam importance, while also increasing priority for harder topics and topics where the student has lower confidence.

The optimizer then treats the problem like 0/1 knapsack:

- Capacity = total available study hours
- Cost = estimated hours for a topic
- Value = calculated priority score

The backend builds a DP table where `dp[i][hours]` stores the best score possible using the first `i` topics with `hours` available. After filling the table, it walks backward through the table to find which topics were selected.

## Project Structure

```text
prepwise/
  frontend/
    src/
      components/
        TopicForm.jsx
        TopicList.jsx
        StudyPlanResult.jsx
      App.jsx
      main.jsx
      styles.css
  backend/
    server.js
    algorithms/
      studyOptimizer.js
    routes/
      optimizeRoute.js
  README.md
```

## How to Run the Backend

```bash
cd prepwise/backend
npm install
npm run dev
```

The backend runs on `http://localhost:5000`.

## How to Run the Frontend

Open a second terminal:

```bash
cd prepwise/frontend
npm install
npm run dev
```

The frontend runs on the Vite URL shown in the terminal, usually `http://localhost:5173`.

If your backend runs on a different URL, create a `.env` file in `prepwise/frontend`:

```text
VITE_API_URL=http://localhost:5000
```

## API Endpoint

### POST `/api/optimize-study-plan`

Example request:

```json
{
  "examName": "Algorithms Final",
  "examDate": "2026-06-10",
  "totalHours": 12,
  "topics": [
    {
      "name": "Dynamic Programming",
      "estimatedHours": 5,
      "importance": 5,
      "difficulty": 5,
      "confidence": 2
    },
    {
      "name": "Graph Algorithms",
      "estimatedHours": 4,
      "importance": 4,
      "difficulty": 4,
      "confidence": 3
    }
  ]
}
```

Example response:

```json
{
  "examName": "Algorithms Final",
  "examDate": "2026-06-10",
  "selectedTopics": [
    {
      "name": "Dynamic Programming",
      "estimatedHours": 5,
      "suggestedHours": 5,
      "importance": 5,
      "difficulty": 5,
      "confidence": 2,
      "priorityScore": 33,
      "reason": "Dynamic Programming was selected because it has importance 5/5, difficulty 5/5, and confidence 2/5. Higher importance, harder topics, and lower confidence increase its priority score."
    }
  ],
  "skippedTopics": [],
  "totalHoursUsed": 9,
  "remainingHours": 3,
  "totalPriorityScore": 59,
  "explanation": "PrepWise selected 2 topic(s) for Algorithms Final using a dynamic programming approach similar to 0/1 knapsack. The plan uses 9 of 12 available hour(s) and maximizes the total priority score."
}
```

## Future Improvements

- User accounts
- Saving multiple study plans
- Calendar integration
- Splitting study hours by day
- Better algorithm for partial topic study
- AI-generated study recommendations

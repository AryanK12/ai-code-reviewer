# 🤖 AI Code Reviewer

An AI-powered code review tool that gives structured, purpose-aware feedback on your code — not just a wall of generic text, but categorized bugs, readability, performance, and security issues, with concrete refactoring suggestions.

Built with React, Express, and Google Gemini — independently extended from a friend's project with structured output, purpose-aware context, and production-style hardening.

## Features

- **Structured AI Review** — Gemini returns categorized JSON (bugs, readability, performance, security), not raw markdown, so the UI can render real, distinct sections instead of dumping text
- **Purpose-Aware Context** — optionally describe what the code is for (e.g. *"LeetCode Two Sum, optimize for O(n)"*) and the review adapts — it'll even flag when the code doesn't actually solve the stated problem
- **Live Code Editor** — syntax-highlighted editing via `react-simple-code-editor` + PrismJS
- **Built to Handle Real Traffic** — rate limiting, input validation, and proper error handling so a bad request or a Gemini outage fails gracefully instead of leaking stack traces
- **Tuned for Consistency** — generation parameters (temperature, output limits) tuned specifically for reliable, repeatable review feedback rather than creative variance

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, PrismJS, Axios |
| Backend | Node.js, Express |
| AI Engine | Google Gemini API (`gemini-3.6-flash`) |

## 📁 Project Structure
ai-code-reviewer/
├── FrontEnd/ React (Vite) app
└── BackEnd/
├── server.js Entry point
└── src/
├── app.js Express app setup
├── routes/ Route definitions
├── controllers/ Request handling
└── services/ Gemini integration


Backend follows a routes → controller → service pattern, keeping request handling, business logic, and the AI integration cleanly separated.

## 🧪 Local Development

```bash
git clone https://github.com/AryanK12/ai-code-reviewer.git
cd ai-code-reviewer
```

**Backend**
```bash
cd BackEnd
npm install
```
Create `BackEnd/.env` (see `.env.example`):
GOOGLE_GEMINI_KEY=your_gemini_api_key_here

```bash
npm run dev
```
Runs on `http://localhost:3000`.

**Frontend** (separate terminal)
```bash
cd FrontEnd
npm install
npm run dev
```
Runs on `http://localhost:5173`.

## 📡 API

`POST /ai/get-review`

**Request**
```json
{
  "code": "function add(a, b) { return a + b; }",
  "context": "optional — describe the code's purpose"
}
```

**Response**
```json
{
  "summary": "string",
  "issues": [
    { "category": "bug | readability | performance | security", "description": "string", "severity": "low | medium | high" }
  ],
  "suggestions": [
    { "title": "string", "explanation": "string", "code": "string | null" }
  ]
}
```

Rate limited to 5 requests/minute per IP.

## 🗺️ Roadmap

- [ ] Multi-language support (currently JavaScript only)
- [ ] Review history / persistence
- [ ] Deployment

## 🙋 Author

Built by **Aryan Kumar**
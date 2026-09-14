# 🤖 AI Code Reviewer

A code review tool that uses Google's Gemini API to analyse code and return structured, categorised feedback — bugs, readability, performance, and security issues along with concrete refactoring suggestions, rather than a single block of generic text.

## 🧠How It Works

1. Paste code into the editor (optionally, describe what the code is for)
2. The backend sends it to Gemini with a schema-enforced prompt
3. Gemini returns structured JSON — not markdown text — which the frontend renders as distinct sections: summary, issues, and suggestions

The context field is what makes this more than a wrapper around an API call. Giving Gemini a stated purpose (e.g. "LeetCode Two Sum, optimize for O(n)") changes what it prioritises — it'll skip suggesting production-hardening advice on clearly algorithmic code, and will flag it directly if the submitted code doesn't actually solve the stated problem.

## 📁 Architecture

```
ai-code-reviewer/
├── FrontEnd/                React (Vite) app
└── BackEnd/
    ├── server.js             Entry point
    └── src/
        ├── app.js             Express app setup
        ├── routes/             Route definitions
        ├── controllers/        Request handling
        └── services/           Gemini integration
```

The backend follows a routes → controller → service structure to keep request handling, business logic, and the AI integration separated. This mirrors the pattern used in another project of mine ([AI Resume Analyzer](#)), applied here to a different domain.

## 🛠 Tech Stack

- **Frontend:** React, Vite, PrismJS (syntax highlighting), Axios
- **Backend:** Node.js, Express
- **AI:** Google Gemini API (`gemini-3.6-flash`)

##  📝Notes

A few decisions worth pointing out:

- **Structured output over markdown text** — `responseMimeType: application/json` with an enforced schema, so the frontend can render real UI sections instead of parsing/rendering markdown blindly.
- **Rate limiting and input validation** — protects against abuse and controls Gemini API cost, since each request has a real cost attached.
- **Tuned generation parameters** — `temperature: 0.2` and a capped `maxOutputTokens`, chosen because code review benefits from consistency over creative variance.
- **Graceful failure handling** — a Gemini outage or malformed request returns a clean error message, not a raw stack trace.

## 🖥️Running Locally

**Backend**
```bash
cd BackEnd
npm install
```

Create `BackEnd/.env` (see `.env.example`):

```
GOOGLE_GEMINI_KEY=your_gemini_api_key_here
```

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

## 📡API Reference

`POST /ai/get-review`

Request:
```json
{
  "code": "function add(a, b) { return a + b; }",
  "context": "optional — describe the code's purpose"
}
```

Response:
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

Limited to 5 requests per minute per IP.

## 🗺️Known Limitations / Roadmap

- Editor syntax highlighting is currently JavaScript-only
- No review history or persistence yet
- Not yet deployed

## 🙋Credit

Built by Aryan Kumar 💻 ☕
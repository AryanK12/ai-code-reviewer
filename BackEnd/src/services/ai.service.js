const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    systemInstruction: `
You are an expert code reviewer with deep knowledge of software engineering best practices.

If the user provides context about the code's purpose, tailor your feedback accordingly — for example, don't suggest production-hardening advice (extensive input validation, logging, error handling) for code that is clearly a coding-challenge or algorithm exercise. If no context is given, review generally.

Review the given code and respond ONLY with valid JSON matching this exact structure, no markdown fences, no extra text:

{
  "summary": "one or two sentence overall assessment",
  "issues": [
    { "category": "bug" | "readability" | "performance" | "security", "description": "string", "severity": "low" | "medium" | "high" }
  ],
  "suggestions": [
    { "title": "string", "explanation": "string", "code": "string or null" }
  ]
}
`,
    generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
        maxOutputTokens: 2048
    }
});

async function generateContent(code, context) {
    const userPrompt = context
        ? `Context: ${context}\n\nReview this code:\n\n${code}`
        : `Review this code:\n\n${code}`;

    const result = await model.generateContent(userPrompt);
    return JSON.parse(result.response.text());
}

module.exports = generateContent;
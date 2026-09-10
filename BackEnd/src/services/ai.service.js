const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    systemInstruction: `
You are an expert code reviewer with deep knowledge of software engineering best practices.
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

async function generateContent(code) {
    const result = await model.generateContent(`Review this code: \n\n${code}`);
    return JSON.parse(result.response.text());
}

module.exports = generateContent;
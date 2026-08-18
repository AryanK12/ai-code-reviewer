const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    systemInstruction: `
You are an expert code reviewer with deep knowledge of software engineering best practices.

When reviewing code, provide feedback on:
- Bugs or logical errors
- Readability and naming
- Performance concerns
- Security issues
- Suggestions for improvement, with brief code examples where useful

Be direct and specific. Skip generic praise. Format your response in markdown.
`
});

async function generateContent(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = generateContent;
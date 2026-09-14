const aiService = require('../services/ai.service')

module.exports.getReview = async (req, res) => {
    const code = req.body.code;
    const context = req.body.context;

    if (!code) {
        return res.status(400).send("Prompt is required");
    }

    if (code.length > 10000) {
        return res.status(400).json({
            error: "Code snippet too long. Please limit to 10,000 characters."
        });
    }

    try {
        const response = await aiService(code, context);
        res.send(response);
    } catch (error) {
        console.error("Gemini API error:", error.message);

        if (error.message?.includes('503') || error.status === 503) {
            return res.status(503).json({
                error: "AI service is temporarily overloaded. Please try again shortly."
            });
        }

        res.status(500).json({
            error: "Something went wrong while reviewing your code."
        });
    }
}
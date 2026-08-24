const express = require("express");
const rateLimit = require("express-rate-limit");
const aiController = require("../controllers/ai.controller")

const router = express.Router();

const reviewLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5,              // limit each IP to 5 requests per window
    message: {
        error: "Too many review requests. Please wait a minute before trying again."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/get-review', reviewLimiter, aiController.getReview)

module.exports = router;

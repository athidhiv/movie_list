const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/chat", async (req, res) => {
    const { message } = req.body; // Get message from request body

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const options = {
        method: "POST",
        url: "https://chatgpt-42.p.rapidapi.com/conversationgpt4",//'https://chatgpt-42.p.rapidapi.com/conversationllama3''https://chatgpt-42.p.rapidapi.com/deepseekai'
        headers: {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
            "Content-Type": "application/json"
        },
        data: {
            messages: [{ role: "user", content: message }],
            system_prompt: "",
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            web_access: false
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data); // Send response back to frontend
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch chat response", details: error.message });
    }
});

module.exports = router;

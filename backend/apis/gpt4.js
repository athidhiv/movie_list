const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const options = {
        method: 'POST',
        url: 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions',
        headers: {
            'x-rapidapi-key': process.env.API_KEY, // Use environment variables for security
            'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            messages: [
                {
                    role: 'user',
                    content: userMessage
                }
            ],
            model: 'gpt-4o',
            max_tokens: 100,
            temperature: 0.9
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch response', details: error.message });
    }
});

module.exports = router;

const express = require('express'); //5 use per year
const axios = require('axios');

const router = express.Router();

router.post('/generate-video', async (req, res) => {
    const { text_prompt, width, height, motion, time } = req.body;

    const options = {
        method: 'POST',
        url: 'https://runwayml.p.rapidapi.com/generate/text',
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': 'runwayml.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            text_prompt,
            model: 'gen3',
            width: width || 1344,
            height: height || 768,
            motion: motion || 5,
            seed: 0,
            callback_url: '',
            time: time || 5
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate video', details: error.message });
    }
});

module.exports = router;

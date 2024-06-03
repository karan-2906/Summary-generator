// backend/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/submit-text', async (req, res) => {
    const { text } = req.body;

    try {
        if (text.length > 0) {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            const prompt = ` ${text} provide me the summary of the above text`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const generatedText = await response.text();

            res.json({ success: true, generatedText });
            console.log(generatedText)
        } else {
            res.json({ success: false, message: 'No text found entered' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

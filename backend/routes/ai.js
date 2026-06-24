const express = require('express');
const { generateText } = require('../utils/llm');
const router = express.Router();

router.post('/smart-reply', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const suggestion = (await generateText(
      `Suggest a concise, casual reply to this message: "${message}"`
    )).trim();
    res.json([suggestion]);
  } catch (err) {
    console.error('AI error:', err.response?.data || err.message);
    res.status(500).json(['Nice!']);
  }
});

module.exports = router;

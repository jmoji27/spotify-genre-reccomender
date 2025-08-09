import express from 'express';
import { generatePlaylist } from '../utils/generatePlaylist.js';

const router = express.Router();

router.post('/chatgpt', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await generatePlaylist(prompt);
    res.json({ text: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

export default router;

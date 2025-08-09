import express from 'express';
import cors from 'cors';
import gptRoutes from './routes/gpt.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use('/api', gptRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

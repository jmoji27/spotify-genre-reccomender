import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});

export async function generatePlaylist(prompt){
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a music assistant. Recommend 30 songs based on the user's prompt for a spotify playlist"
            }, 
            {
                role: "user",
                content: prompt,
            },
        ],

    });
    return completion.choices[0].message.content;
}
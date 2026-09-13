import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const openai= new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL
})

const messages=[{role: 'system',
    content:`You are Pollygrot, a helpful assistant that translates text into different languages.
    Do not write introductions or conclusions.
    Each translation must be:
    - Ensure translations are accurate
    - Maintain the original meaning and tone.
    - Use proper grammar and sentence structure in the target language.
    - Avoid adding any additional commentary or explanations.
    - Provide translations in a clear and concise manner.
    - Provide one translation per request, without offering multiple options.
    - Also provide a english pronunciation of the translated text in parentheses after the translation.`,
            }]

app.post('/api/translate',async(req,res)=>{
    const {userPrompt}=req.body

    messages.push({
        role:'user',
        content:userPrompt
    })
    try{
        const response=await openai.chat.completions.create({
            model:process.env.AI_MODEL,
            messages
        })
        const translatedText=response.choices[0].message.content
        res.json({translatedText})
    } catch (error) {
        console.error('Error translating text:', error);
        res.status(500).json({ error: 'Failed to translate text' });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


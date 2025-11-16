
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as chrono from "chrono-node";


export const parseVoice = async (req, res) => {
  function cleanSpeech(text) {
    return text
      .replace(/add( a)? task( to)?/i, "")
      .replace(/create( a)? task( to)?/i, "")
      .replace(/delete( a)? task( to)?/i, "")
      .replace(/remove( a)? task( to)?/i, "")
      .replace(/update( a)? task( to)?/i, "")
      .replace(/change( a)? task( to)?/i, "")
      .replace(/mark( a)? task( to)?/i, "")
      .replace(/please/i, "")
      .replace(/i want to/i, "")
      .replace(/i need to/i, "")
      .trim();
  }
  try {
    const { text } = req.body;
    const cleaned = cleanSpeech(text);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    
    const prompt = `This the User Command : "${cleaned}" Now Provide me four details that is
      1. What is the intention of the user whether to add the task or to delete or to update it 
      2. create a very short and meaningfull description of the command 
      3. Provide a short title from the command that suits the task
      4. Povide a due date if mentioned in the command or provide today's date


      provide this all 4 points if the intent is to add in JSON format like
      {
        intent: , 
        due_date: , 
        title: ,
        description: 
      }
    
      if the command is to delete the task provide JSON format like
      {
        intent: ,
        task_number: ,
        title: ,
      }

      if the command is to update, mark or to modify provide the JSON format like
      {
        intent: ,
        task_number: ,
        title: ,
        status:
      }

      If the command is to "read my tasks", "tell me my tasks", "what do I have today" provide the JSON format like
      {
        "intent": "read"
      }
      
      without any markdowns or extra markings and dont mention
      `;

    const result = await model.generateContent(prompt);
    let aiText = result.response.text();

    // CLEAN unexpected markdown/output
    aiText = aiText.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(aiText);

    // 🔥 Convert natural-language date → real date
    let finalDueDate = null;
    if (parsed.due_date) {
      const parsedDate = chrono.parseDate(parsed.due_date);
      if (parsedDate) {
        finalDueDate = parsedDate.toISOString();
      }
    }

    return res.json({
      ...parsed,
      due_date: finalDueDate,
    });
  } catch (err) {
    console.error("Gemini Parse Error:", err);
    res.status(500).json({ error: "AI parse failed" });
  }
};

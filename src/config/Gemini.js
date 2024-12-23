import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = import.meta.env.VITE_DOTENV_KEY;
async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const chat = model.startChat({
    history: [
    ], 
    generationConfig : {
      maxOutputTokens:500,
  },
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

 export default runChat;
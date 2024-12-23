// import dotenv from "dotenv";
// import {GoogleGenerativeAI} from "@google/generative-ai";
// import readline from "readline";

// dotenv.config();
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout,
// });

// async function run() {
//     const model = genAI.getGenerativeModel({model: "gemini-pro"})

//     const chat = model.startChat({
//         history: [],
//         generationConfig : {
//             maxOutputTokens:500,
//         },
//     });

//     async function askAndRespond() {
//         rl.question("You:" , async(msg) => {
//             if(msg.toLowerCase() === "exit"){
//                 rl.close();
//             }
//             else {
//                 const result = await chat.sendMessage(msg);
//                 const response = await result.response;
//                 const text = await response.text();
//                 console.log("AI: ",text);
//                 askAndRespond();
//             }
//         });
//     }
//     askAndRespond()
// }
// run()

import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 5173;

const genAI = new GoogleGenerativeAI({
  apiKey: process.env.API_KEY,
});

app.use(cors()); 
app.use(express.json()); // Xử lý dữ liệu JSON từ frontend

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = await response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to process message." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

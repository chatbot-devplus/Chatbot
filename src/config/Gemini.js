import { GoogleGenerativeAI } from '@google/generative-ai'

const MODEL_NAME = 'gemini-2.0-flash-exp'
const API_KEY = import.meta.env.VITE_DOTENV_KEY
async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY)
  const model = genAI.getGenerativeModel({ model: MODEL_NAME })
  const chat = model.startChat({
    history: []
  })

  const result = await chat.sendMessage(prompt)
  const response = result.response
  console.log(response.text())
  return response.text()
}

export default runChat

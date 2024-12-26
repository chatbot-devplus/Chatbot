import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleAICacheManager } from '@google/generative-ai/server'

const MODEL_NAME = 'gemini-1.5-flash-001'
const API_KEY = import.meta.env.VITE_DOTENV_KEY

const MIN_TOKEN_COUNT = 32768
const cacheManager = new GoogleAICacheManager(API_KEY)
const displayName = 'ChatGPT_fake'
const systemInstruction =
  'You are a highly intelligent and versatile assistant capable of analyzing and responding to queries about any type of data or context provided. ' +
  "Your primary objective is to provide accurate, detailed, and helpful answers to the user's questions, regardless of the data format or subject. " +
  'Use logical reasoning, contextual understanding, and data analysis skills to process information and deliver insightful responses.'
let ttlSeconds = 300

let localCache = null
let history = []

export const loadCacheFromOldChat = (messages) => {
  localCache = null
  history = []
  // Chuyển đổi messages từ database thành định dạng history
  const formattedMessages = messages.map((msg) => ({
    role: msg.is_user ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }))

  // Cập nhật vào history
  history.push(...formattedMessages)
}

// Hàm kiểm tra và tạo cache khi đạt điều kiện
async function getOrUpdateCache() {
  // Nếu cache đã được tạo, trả về cache
  if (localCache) {
    return localCache
  }

  // Tính tổng số token trong history
  const totalTokens = history.reduce((sum, entry) => sum + entry.parts[0].text.length, 0)

  // Nếu đạt số token tối thiểu, tạo cache mới
  if (totalTokens >= MIN_TOKEN_COUNT) {
    localCache = await cacheManager.create({
      model: MODEL_NAME,
      displayName,
      systemInstruction,
      contents: history,
      ttlSeconds
    })
    return localCache
  }

  // Nếu chưa đủ, trả về null (chưa dùng cache)
  return null
}

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY)
  const model = genAI.getGenerativeModel({ model: MODEL_NAME })

  const generationConfig = {
    maxOutputTokens: 50000
  }

  // Kiểm tra và sử dụng cache nếu có
  const cache = await getOrUpdateCache()
  const chat = model.startChat({
    history: cache ? cache.contents : history, // Dùng cache nếu có, ngược lại dùng history
    generationConfig
  })

  // Gửi truy vấn
  const result = await chat.sendMessage(prompt)
  const response = result.response

  // Thêm truy vấn và phản hồi vào history
  history.push(
    {
      role: 'user',
      parts: [{ text: prompt }]
    },
    {
      role: 'model',
      parts: [{ text: response.text() }]
    }
  )

  console.log(response.text())
  return response.text()
}

export default runChat

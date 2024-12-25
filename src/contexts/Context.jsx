import { createContext, useState } from 'react'
import runChat from '../config/Gemini'
import { supabase } from '../utils/supabase'
export const Context = createContext()

const ContextProvider = (props) => {
  const [input, setInput] = useState('')
  const [prevPrompts, setPrevPrompts] = useState([])
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState('')
  const [chat, setChat] = useState(null)
  const [messages, setMessages] = useState([])
  let currentChatId = null;

  const newChat = () => {
    setLoading(false)
    setChat(null)
    setMessages([])
  }

  const saveMessage = async (message, is_user, chat_id) => {
    const { error: messageError } = await supabase
      .from('messages')
      .insert([
        {
          content: message,
          is_user: is_user,
          chat_id: chat ? chat.id : chat_id
        }
      ])
      .select()
      .single()
    if (messageError) throw messageError
  }

  const onSent = async (prompt, userId) => {
    setInput('')
    if ( chat ){
      setMessages((prev) => [...prev, { content: prompt, is_user: true }])
      await saveMessage(prompt, true);
    } else {
      const { data: newChat, error: newChatError } = await supabase
        .from('chats')
        .insert([{ user_id: userId, name: prompt }])
        .select()
        .single()

      if (newChatError) throw newChatError;
      setChat(newChat);
      currentChatId = newChat.id;
      setMessages((prev) => [...prev, { content: prompt, is_user: true }]);
      saveMessage(prompt, true, currentChatId)
    }

    setLoading(true)
    let response

    if (prompt !== undefined) {
      response = await runChat(prompt)
      setMessages((prev) => [...prev, { content: response, is_user: false }])
      saveMessage(response, false, currentChatId)

    } else {
      setPrevPrompts((prev) => [...prev, input])
      response = await runChat(input)
      setMessages((prev) => [...prev, { content: response, is_user: false }])
      saveMessage(response, false, currentChatId)
    }

    try {
      if (response.includes('|')) {
        const isTable =
          response.includes('|') && response.split('\n').some((row) => row.split('|').length > 1)
        if (isTable) {
          const rows = response
            .trim()
            .split('\n')
            .filter((row) => row.trim() !== '')
          let markdownTable = ''

          rows.forEach((row, index) => {
            const columns = row
              .split('|')
              .map((col) => col.trim())
              .filter((col) => col !== '')
            if (index === 0) {
              markdownTable += `| ${columns.join(' | ')} |\n`
            } else if (columns.length > 1) {
              markdownTable += `| ${columns.join(' | ')} |\n`
            }
          })
          setResultData(markdownTable)
        }
      } else {
        let responseArray = response.split('**')
        let markdownResponse = ''

        for (let i = 0; i < responseArray.length; i++) {
          if (i % 2 === 1) {
            markdownResponse += `**${responseArray[i]}**`
          } else {
            markdownResponse += responseArray[i]
          }
        }
        markdownResponse = markdownResponse.replace(/(\d+\.\s[^.]+?)(?=\d+\.\s|$)/g, '- $1')
        setResultData(markdownResponse)
      }
    } catch (error) {
      console.error('Error while running chat:', error)
    } finally {
      setLoading(false)
    }
  }

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    input,
    setInput,
    loading,
    resultData,
    newChat,
    messages,
    setMessages,
    setChat
  }

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>
}

export default ContextProvider

import { createContext, useState } from 'react'
import runChat from '../config/Gemini'
export const Context = createContext()

const ContextProvider = (props) => {
  const [input, setInput] = useState('')
  const [recentPrompt, setRecentPrompt] = useState('')
  const [prevPrompts, setPrevPrompts] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState('')

  const newChat = () => {
    setLoading(false)
    setShowResults(false)
  }
  const onSent = async (prompt) => {
    setInput('')
    setResultData('')
    setLoading(true)
    setShowResults(true)
    let response

    if (prompt !== undefined) {
      response = await runChat(prompt)
      setRecentPrompt(prompt)
    } else {
      setPrevPrompts((prev) => [...prev, input])
      setRecentPrompt(input)
      response = await runChat(input)
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
        setResultData(markdownResponse)
      }
    } catch (error) {
      console.error('Error while running chat:', error)
    } finally {
      setLoading(false)
      setInput('')
    }
  }

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    input,
    setInput,
    showResults,
    loading,
    resultData,
    newChat
  }

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>
}

export default ContextProvider

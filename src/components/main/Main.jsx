import TextArea from 'antd/es/input/TextArea'
import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { assets } from '../../assets/assets'
import { Context } from '../../contexts/Context'
import { useAuth } from '../../contexts/AuthContext'
import './main.css'
const Main = () => {
  const { onSent, recentPrompt, showResults, loading, resultData, setInput, input } =
    useContext(Context)

  const { user } = useAuth()

  const handleCardClick = (promptText) => {
    setInput(promptText)
  }
  return (
    <div className="main">
      <div className="nav">
        <p>ChatGPT FAKE</p>
        <img src={user.picture} alt="avatar" />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello , {user.full_name} </span>
              </p>
              <p>How Can i Help You Today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() => handleCardClick('Suggest Some Place To Visit In India.')}
              >
                <p>Suggest Some Place To Visit In India.</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick('Explain the process of photosynthesis in simple terms')
                }
              >
                <p>Explain the process of photosynthesis in simple terms </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick('How do you create a responsive navbar using CSS and JavaScript?')
                }
              >
                <p>How do you create a responsive navbar using CSS and JavaScript?</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => {
                  handleCardClick(
                    'What are some essential skills for becoming a front-end developer?'
                  )
                }}
              >
                <p>What are some essential skills for becoming a front-end developer?</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <p>{recentPrompt}</p>
              <img src={user.picture} alt="" />
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]} className="content">
                  {resultData}
                </ReactMarkdown>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <TextArea
              className="bg-transparent border-none outline-none text-inherit hover:bg-transparent hover:border-none hover:outline-none focus:bg-transparent focus:border-none focus:outline-none "
              onChange={(e) => {
                setInput(e.target.value)
              }}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
              autoSize={{
                minRows: 1,
                maxRows: 6
              }}
            />
            <div className="chat-container">
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img
                src={assets.send_icon}
                alt=""
                onClick={() => {
                  onSent()
                }}
              />
            </div>
          </div>
          <div className="bottom-info">
            <p>
              Gemini may display inaccurate info, including about people, so double-check its
              responses. Your privacy & Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main

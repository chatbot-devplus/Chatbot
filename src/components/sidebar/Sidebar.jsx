import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Context } from '../../contexts/Context'
import { supabase } from '../../utils/supabase'
import './sidebar.css'
const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

  const loadPreviousPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  const logout = () => {
    supabase.auth.signOut()
  }
  return (
    <div className="sidebar">
      <div className="top">
        <img
          src={assets.menu_icon}
          className="menu"
          alt="menu-icon"
          onClick={() => {
            setExtended((prev) => !prev)
          }}
        />
        <div
          className="new-chat"
          onClick={() => {
            newChat()
          }}
        >
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    loadPreviousPrompt(item)
                  }}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>History</p> : null}
        </div>
        <div className="bottom-item recent-entry" onClick={logout}>
          <img src={assets.logout} alt="" />
          {extended ? <p>Logout</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar

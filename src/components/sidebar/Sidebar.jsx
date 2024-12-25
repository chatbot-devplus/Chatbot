import { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useAuth } from '../../contexts/AuthContext'
import { Context } from '../../contexts/Context'
import { supabase } from '../../utils/supabase'
import './sidebar.css'
const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const { newChat, setChat, setMessages } = useContext(Context)
  const [chats, setChats] = useState([])
  const { user } = useAuth()

  const loadPreviousPrompt = async (chat) => {
    await setChat(chat)
    fetchMessages(chat.id)
  }

  const logout = () => {
    supabase.auth.signOut()
  }

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data, error } = await supabase
          .from('chats')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        setChats(data)

        if (error) {
          throw error
        }
      } catch (error) {
        console.error('Error fetching chats:', error)
      }
    }

    fetchChats()
  }, [extended])

  const fetchMessages = async (chatId) => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true })
    console.log(data)
    setMessages(data || [])
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
          <img src={assets.plus_icon} alt="new chat icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        <div className="history">
          {extended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {chats.map((chat) => {
                return (
                  <div
                    key={chat.id}
                    onClick={() => {
                      loadPreviousPrompt(chat)
                    }}
                    className="recent-entry"
                  >
                    <img src={assets.message_icon} alt="" />
                    <p>
                      {chat.name.slice(0, 18)} {chat.name.length > 18 && '...'}
                    </p>
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
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

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession()
      if (data?.session?.user) {
        const userMetadata = data.session.user.user_metadata
        setUser(userMetadata)
        localStorage.setItem('user', JSON.stringify(userMetadata))
      }
    }

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const userMetadata = session?.user?.user_metadata || null
      setUser(userMetadata)
      if (userMetadata) {
        localStorage.setItem('user', JSON.stringify(userMetadata))
      } else {
        localStorage.removeItem('user')
      }
    })

    getUser()

    return () => subscription.subscription.unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

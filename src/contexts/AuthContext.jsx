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
        userMetadata.id = data.session.user.id
        setUser(userMetadata)
        localStorage.setItem('user', JSON.stringify(userMetadata))
      }

      // Kiểm tra và lưu thông tin người dùng vào Supabase
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.session.user.id)
        .single()

      const { id, email, full_name, avatar_url } = data.session.user.user_metadata

      console.log(data.session.user.user_metadata)

      if (!existingUser) {
        await supabase.from('users').insert([
          {
            id,
            email,
            full_name,
            avatar_url
          }
        ])
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

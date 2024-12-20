import React from 'react'
import { useAuth } from '../contexts/AuthContext';


const Home = () => {
 const {user} = useAuth();
  return (
    <div>Hello {user?.email}</div>
  )
}

export default Home
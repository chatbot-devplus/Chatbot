import React from 'react'
import LoginComponent from '../components/LoginComponent'

const Login = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center', // Căn giữa theo chiều ngang
        alignItems: 'center',     // Căn giữa theo chiều dọc
        height: '100vh',          // Chiều cao toàn màn hình
        margin: 0                 // Loại bỏ margin mặc định
      }}><LoginComponent/></div>
  )
}

export default Login
import React from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from './components/Login'
import Home from './container/Home'
import styles from "./index.css"
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <Routes>
      {/* <GoogleOAuthProvider
        clientId={process.env.REACT_GOOGLE_CLIENT_ID}
      render={(renderProps) => {

      }}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"> */}

      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
      {/* </GoogleOAuthProvider> */}
    </Routes>
  )
}

export default App
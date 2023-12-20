import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { FcGoogle } from "react-icons"
import GoogleIcon from '@mui/icons-material/Google';
import video from "../assets/assets/share.mp4"
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import logo from "../assets/assets/logowhite.png"
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'
import { client } from '../client'

function Login() {

  const navigate = useNavigate()

  return (

    <div className='justify-start flex item-center flex-col h-screen'>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      >
        {/* {console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)} */}

        <div className='relative w-full h-full'>
          <video
            src={video}
            typeof='video/mp4'
            loop
            autoPlay
            controls={false}
            muted
            className='w-full h-full object-cover'
          />
        </div>

        <div className='absolute flex flex-col items-center justify-center top-0 right-0 bottom-0 left-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width="150px" alt="logo" />
          </div>

          <div className='shadow-2x1'>
            <GoogleLogin
              onSuccess={(response) => {
                localStorage.setItem('user', JSON.stringify(jwtDecode(response.credential)))

                console.log(jwtDecode(response.credential))

                const { name, email, picture, jti } = jwtDecode(response.credential)

                const doc = {
                  _id: jti,
                  _type: 'user',
                  userName: name,
                  image: picture
                }

                client.createIfNotExists(doc)
                  .then(() => {
                    navigate('/', { replace: true })
                  })

              }
              }

              onError={() => console.log("error")}
            // useOneTap
            />
          </div>
        </div>
      </GoogleOAuthProvider >
    </div >

  )
}

export default Login
import React from 'react'
import LoginSpace from './LoginSpace'
import { useState } from 'react';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    
    <div className='LoginPage' id='LoginPage'>
      <LoginSpace 
        isLoggedIn = {isLoggedIn}
        setIsLoggedIn = {setIsLoggedIn}
      />
    </div>
  )
}

export default LoginPage
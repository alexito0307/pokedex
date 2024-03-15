import React from 'react'
import LoginButton from './Login'
import LogoutButton from './Logout'
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = "227800948030-kcfd1psosdgbrcieih4ft7n7m8jdjheo.apps.googleusercontent.com";

const LoginSpace = () => {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  });
  return (
    <div className='LoginSpace'>
      <div className='LoginImage'>
        <img src="/mimikyu.gif" alt="Mimikyu GIF" style={{ height: '100%' , borderRadius: '15px'}}/>
      </div>
      <div className='LoginText'>
        <span style={{ color: '#e5c454', fontSize: '80px'}}>Bienvenido!</span>
        <LoginButton />
        <p></p>
        <p></p>
        <LogoutButton />
      </div>
    </div>
  )
}

export default LoginSpace
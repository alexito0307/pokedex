import React from 'react'
import LogoutButton from './Logout'
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = "227800948030-kcfd1psosdgbrcieih4ft7n7m8jdjheo.apps.googleusercontent.com";

const Footer = () => {
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
    <div className='headerLogoutButton'>
      <LogoutButton />
    </div>
  )
}

export default Footer
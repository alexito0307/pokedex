import React from 'react'
import { GoogleLogout } from 'react-google-login'

const clientId = "227800948030-kcfd1psosdgbrcieih4ft7n7m8jdjheo.apps.googleusercontent.com";

const Logout = () => {
  const onSuccess = () =>
  {
    console.log("LOGOUT SUCCESSFUL")
  }
  return (
    <div id='signOutButton'>
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

export default Logout;
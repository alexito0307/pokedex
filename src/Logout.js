import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import UserInfo from './UserInfo';

const clientId = "227800948030-kcfd1psosdgbrcieih4ft7n7m8jdjheo.apps.googleusercontent.com";

const Logout = () => {
  let navigate = useNavigate();
  const {userInfo, setUserInfo} = UserInfo();

  const onSuccess = () =>
  {
    console.log("LOGOUT SUCCESSFUL");
    navigate('/');
  }
  return (
    <div id='signOutButton'>
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout from Google"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

export default Logout;
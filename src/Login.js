import GoogleLogin from "react-google-login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "./GlobalState";

const clientId = "227800948030-kcfd1psosdgbrcieih4ft7n7m8jdjheo.apps.googleusercontent.com";

function Login()
{
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } = useGlobalState();
  let navigate = useNavigate();

  const onSuccess = (res) =>
  {
    console.log("LOGIN SUCCESS | USER: ",res.profileObj);
    setIsLoggedIn(true);
    setUserInfo(res.profileObj);
    navigate('/App');
  }
  const onFailure = (res) =>
  {
    console.log("LOGIN FAILES | RES: ",res);
    setIsLoggedIn(false);
    setUserInfo(null);
  }
  return (
    <div id='signInButton'>
      <GoogleLogin
        clientId= {clientId}
        buttonText="Sign In with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}
export default Login;
import GoogleLogin from "react-google-login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "./GlobalState";
import apiRequest from "./apiRequest";

const clientId = "227800948030-kcfd1psosdgbrcieih4ft7n7m8jdjheo.apps.googleusercontent.com";

function Login()
{
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } = useGlobalState();
  const localhost = 'http://localhost:3500/accounts';
  const [fetchError, setFetchError] = useState();
  let navigate = useNavigate();

  const postNewAccount = async (account) =>
  {
    const googleId = account.profileObj.googleId;
    const newAccount = {id: googleId};
    try {
      const response = await fetch(`${localhost}/${googleId}`, {method: 'GET'});
      if(response.ok)
      {
        console.log('Account Exists');
      }
      else if(response.status === 404)
      {
        throw new Error('Account not Found');
      }
    } catch (error) {
      if(error.message === 'Account not Found') {
        const postOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newAccount)
        }
        const result = await apiRequest(localhost, postOptions);
        if (result) setFetchError(result);
      }
    } 
  }

  const onSuccess = (res) =>
  {
    console.log("LOGIN SUCCESS | USER: ", res.profileObj);
    setIsLoggedIn(true);
    postNewAccount(res);
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
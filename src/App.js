import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import { useGlobalState } from "./GlobalState";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } = useGlobalState();
  let navigate = useNavigate();
  
  useEffect(() => {
    if(isLoggedIn == false)
    {
      navigate('/');
    }
  }, []);

  return (
    <div className="App" id="App">
      <Header />     
      <Content /> 
      <Footer />
    </div>

  );
}

export default App;

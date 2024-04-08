import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import { useGlobalState } from "./GlobalState";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TeamSelector from "./TeamSelector";

function App() {
  const { isLoggedIn } = useGlobalState();
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
      <TeamSelector />
      <Content /> 
      <Footer />
    </div>

  );
}

export default App;

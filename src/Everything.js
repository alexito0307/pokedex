import React from 'react'
import LoginPage from './LoginPage'
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom/dist';


const Everything = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<LoginPage/>}></Route>
        <Route path="/App" element = {<App/>}></Route>
      </Routes> 
    </BrowserRouter>

  )
}

export default Everything
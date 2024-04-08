import React from 'react'
import LoginPage from './LoginPage'
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom/dist';
import { GlobalStateProvider } from './GlobalState';
import PokemonTeam from './PokemonTeam';


const Everything = () => {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<LoginPage/>}></Route>
          <Route path="/App" element = {<App/>}></Route>
          <Route path="/PokemonTeam" element = {<PokemonTeam/>}></Route>
        </Routes> 
      </BrowserRouter>
    </GlobalStateProvider>

  )
}

export default Everything
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleRedirectToApp = () => {
    navigate('/');
  }
  return (
    <header>
      <div className='Header' onClick={handleRedirectToApp}>
        <img src="/pokeball.png" alt="Pokeball" style={{ width:'55px', height:'55px'}} />
        <span style={{ marginLeft: '10px', color:'#333333', fontSize:'50px'}}>Pokedex</span>
      </div>      
    </header>
  )
}

export default Header
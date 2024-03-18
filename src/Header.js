import React from 'react';

const Header = () => {
  return (
    <header>
      <div className='Header'>
        <img src="/pokeball.png" alt="Pokeball" style={{ width:'55px', height:'55px'}}/>
        <span style={{ marginLeft: '10px', color:'#333333', fontSize:'50px'}}>Pokedex</span>
      </div>      
    </header>
  )
}

export default Header
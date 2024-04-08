import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(1);
  

  return (
    <GlobalStateContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo, currentTeam, setCurrentTeam}}>
      {children}
    </GlobalStateContext.Provider>
  );
};

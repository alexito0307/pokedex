import React, { useState } from 'react'
import { useGlobalState } from './GlobalState';
import { useEffect } from 'react';

const TeamSelector = () => {
  const { userInfo, setCurrentTeam } = useGlobalState();
  const [userTeams, setUserTeams] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = `http://localhost:3500/accounts`;
  
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const googleId = userInfo.googleId;
      const response = await fetch(`${API_URL}/${googleId}`);
      if (!response.ok) throw new Error('Did not receive expected data');
      const accountDetails = await response.json();
      setUserTeams(accountDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePokemonTeamInfo = (team) => {
    setCurrentTeam(team);
  }

  return (
    <div className='ContentTeamSelector'>
      { userTeams && Object.entries(userTeams).map(([teamName]) => {
        if(teamName == 'id') return null;
        return (
          <button key={teamName} className='PokemonTeamSidebarButton' onClick={() => handlePokemonTeamInfo(teamName)}>{teamName}</button>
        )
      })
      }
    </div>
  )
}

export default TeamSelector
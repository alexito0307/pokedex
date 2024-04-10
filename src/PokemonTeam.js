import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from './GlobalState';
import Header from './Header';
import { useEffect } from 'react';
import apiRequest from './apiRequest';

const PokemonTeam = () => {
  let navigate = useNavigate();
  const { isLoggedIn, userInfo, currentTeam, setCurrentTeam } = useGlobalState();
  const [teamSelected, setTeamSelected] = useState(false);
  const [userTeams, setUserTeams] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [createNewTeam, setCreateNewTeam] = useState(false);
  const [editCurrentTeam, setEditCurrentTeam] = useState(false);
  const [optionSelected, setOptionSelected] = useState(false);
  const [fetchError, setFetchError] = useState();
  const [newTeamName, setNewTeamName] = useState();
  const [newTeamDesc, setNewTeamDesc] = useState();
  
  const API_URL = `http://localhost:3500/accounts`;

  useEffect(() => {
    if(isLoggedIn == false)
    {
      navigate('/');
    }
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

  const addTeam = async () => {
    const googleId = userInfo.googleId;
    const team = `${newTeamName}`;
    const endpoint = `${API_URL}/${googleId}`;
    let teamExists = false;
    let userResponse = {};
    //Fetching Item
    try {
      setIsLoading(true);
      const response = await fetch(endpoint);
      if (!response.ok) throw Error ('Did not received expected data');
      userResponse = await response.json();

      if (userResponse?.[team]) {
        teamExists = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    if(!teamExists)
    {
      const newTeam = {[newTeamName]: {newTeamDesc}};
      const postOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTeam) 
      };
      // Hacer la petición PATCH.
      const result = await apiRequest(endpoint, postOptions); 
      if (result) setFetchError(result);
    }
  }

  const editTeam = async () => {

  }
  
  const handlePokemonTeamInfo = (team) => {
    setCurrentTeam(team);
    setTeamSelected(true);
  }

  const handleCreateTeam = (e) => {
    const formData = new FormData(e.target);

    const teamName = formData.get('teamName');
    const teamDesc = formData.get('teamDesc');
    setNewTeamName(teamName);
    setNewTeamDesc(teamDesc);
  }

  useEffect(() => {
    if (newTeamName && newTeamDesc) {
      addTeam();
    }
  }, [newTeamName, newTeamDesc]);
  

  const handleCreateTeamScreen = () => {
    setOptionSelected(true);
    setCreateNewTeam(true);
  }

  const handleEditTeamScreen = () => {
    setOptionSelected(true);
    setEditCurrentTeam(true);
  }

  const handleDeleteTeam = async () => {
    const googleId = userInfo.googleId;
    const endpoint = `${API_URL}/${googleId}`;
    try {
  
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Could not fetch user data');
      const accountData = await response.json();
  
      delete accountData[currentTeam];

      const updateResponse = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });
  
      if (!updateResponse.ok) throw new Error('Error, could not update user data');
  
      const newUserTeams = {...userTeams};
      delete newUserTeams[currentTeam];
      setUserTeams(newUserTeams);
      setTeamSelected(false); 
    } catch (error) {
      console.error('Error, could not delete team:', error);
    }
  };

  const handlePokemonDelete = async (pokemonName) => {
    const newUserTeams = JSON.parse(JSON.stringify(userTeams));
    delete newUserTeams[currentTeam][pokemonName];
    const googleId = userInfo.googleId;
    const endpoint = `${API_URL}/${googleId}`;
  
    try {
      // Aquí se asume que el endpoint de la API es capaz de manejar una actualización específica para el equipo
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserTeams), // Envía el equipo actualizado sin el Pokémon borrado
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the pokemon');
      }
      setUserTeams(newUserTeams);
    } catch (error) {
      console.error('Error deleting pokemon:', error);
    }
  };
  
  const changeTeamNameandDesc = async (e) => {
    e.preventDefault(); 
  
    const formData = new FormData(e.target);
    const newTeamName = formData.get('newTeamName').trim();
    const newTeamDesc = formData.get('newTeamDesc').trim();
    const updatedUserTeams = {...userTeams}; 
  
    
    if (newTeamName && newTeamName !== currentTeam && newTeamName !== "") {
      updatedUserTeams[newTeamName] = { ...updatedUserTeams[currentTeam] };
      if (newTeamDesc !== "") { 
        updatedUserTeams[newTeamName].newTeamDesc = newTeamDesc;
      }
      delete updatedUserTeams[currentTeam]; 
    } else if (newTeamDesc !== "") { 
      updatedUserTeams[currentTeam].newTeamDesc = newTeamDesc;
    }
  
    try {
      const googleId = userInfo.googleId;
      const response = await fetch(`${API_URL}/${googleId}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUserTeams), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the team');
      }
      setUserTeams(updatedUserTeams);
      setCurrentTeam(newTeamName || currentTeam); 
    } catch (error) {
      console.error('Error updating team:', error);
    }
    setEditCurrentTeam(false);
    setOptionSelected(false);
  };
  
  

  
  return (
    <div className='PokemonTeam'>
      <Header />

      {!isLoading && (
      <div className='PokemonTeamInfo'>
        <div className='PokemonTeamSelector'>
          {Object.entries(userTeams).map(([teamName, {newTeamDesc}]) => {
            if(teamName == 'id') return null;
            return (
              <button key={teamName} className='PokemonTeamSidebarButton' onClick={() => handlePokemonTeamInfo(teamName)}>{teamName} - {newTeamDesc}</button>
            )
          })
          }
        </div>
        <div className='PokemonTeamViewer'>
          {teamSelected && !editCurrentTeam &&
            (Object.entries(userTeams[currentTeam]).map(([pokemonName, {pokemonImage}]) => {
              if(pokemonName == 'newTeamDesc') return null;
            return (
              <div key={pokemonName} className='Pokemon'>
                <span>{pokemonName}</span>
                <img src={pokemonImage} alt={pokemonName} style={{ width:'100%', height: '100%'}}/>
              </div>
            )
          }))}

          {teamSelected && editCurrentTeam && 
            (Object.entries(userTeams[currentTeam]).map(([pokemonName, {pokemonImage}]) => {
              if(pokemonName == 'newTeamDesc') return null;
            return (
              <div key={pokemonName} className='Pokemon' onClick={() => handlePokemonDelete(pokemonName)}>
                <span>{pokemonName}</span>
                <img src={pokemonImage} alt={pokemonName} style={{ width:'100%', height: '100%'}}/>
              </div>
            )
          }))}
        </div>
      </div> 
      )}


      <div className='PokemonTeamFooter'>
        {!optionSelected && (
          <div className='PokemonTeamFooterButtons'>
            <button className='PokemonTeamButton' onClick={handleCreateTeamScreen}>Crear Equipo</button>
            <button className='PokemonTeamButton' style={{ marginTop:  '1vh'}} onClick={handleEditTeamScreen}>Editar Equipo Seleccionado</button>
            <button className='PokemonTeamButton' style={{ marginTop: '1vh'}} onClick={handleDeleteTeam}>Borrar Equipo Seleccionado</button>
          </div>
        )}


        {createNewTeam && (
          <div className='PokemonTeamCreator'>
            <form className='PokemonTeamCreatorForm' onSubmit={handleCreateTeam}>
              <input type="text" className='PokemonTeamFormInput' placeholder='Ingrese el nombre del equipo...' name='teamName'required/>
              <input style = {{ marginTop:'1vh'}}type="text" className='PokemonTeamFormInput' placeholder='Ingrese la descripcion del equipo...' name='teamDesc'required/>
              <button className='PokemonTeamButton' style={{ marginTop:'1vh' }} action="submit">Enviar</button>
            </form>
          </div>
        )}


        {editCurrentTeam && (
          <div className='PokemonTeamEditor'>
            <p style={{float:'left', marginRight:'5vh', color:'', fontSize:'3vh'}}>Seleccione los pokemones que quiere borrar</p>
            <form className='PokemonTeamCreatorForm' style={{ float:'right'}} onSubmit={changeTeamNameandDesc}>
              <input type="text" className='PokemonTeamFormInput' placeholder='Ingrese el nuevo nombre del equipo (deje en blanco si lo quiere dejar asi)' name='newTeamName'/>
              <input type="text" className='PokemonTeamFormInput' style={{ marginTop: '1vh' }} placeholder='Ingrese la nueva descripcion del equipo (deje en blanco si lo quiere dejar asi)' name='newTeamDesc'/>
              <button className='PokemonTeamButton' style={{ marginTop:'1vh' }} action="submit" >Guardar cambios</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonTeam
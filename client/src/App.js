import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { BsSpotify } from 'react-icons/bs';
import ChatGpt from './components/ChatGpt'; 



function App() {
  const [token , setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    if (!token && hash){
      token = hash.substring(1)
      .split("&")
      .find(elem => elem.startsWith("access_token"))
      ?.split("=")[1]

      if(token){
        window.location.hash = ""
         window.localStorage.setItem("token", token)

      }
      
      
    }
    setToken(token)


  }, []);

  const spotifyLogin = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = "http://127.0.0.1:3000"
    const scopes = ['playlist-modify-public user-top-read '];
    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    window.location = url;
  };

  const getUserId = async (access_token) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    const res = await response.json();
    if (res.error){
      setToken("")
      window.localStorage.removeItem("token")
      return;
    }
    window.localStorage.setItem("user_id", res.id)

  };


  return (
    <div className="App">
      <header className = "App-header">
        <h1>
          Spotify AI 
          <BsSpotify/>
        </h1>
        {token ?
        <ChatGpt/>
        : <button onClick={spotifyLogin}>Login To Start</button>
      }
      </header>
    </div>
  );
}

export default App;

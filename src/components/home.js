import React from "react";
import { useEffect, useState } from 'react';



function Home() {

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'
  const SCOPES = [
    "user-top-read"
  ]

  const [token, setToken] = useState("")
 

  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")
      if(!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
        window.location.hash = ""
        window.localStorage.setItem('token', token)
      }
      setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }


  return (
    
    <div className="home">
      <header className="App-header">
        <h1>Music Like Me</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=${RESPONSE_TYPE}`}>Login 
          To Spotify</a>
        : <button onClick={logout}>Logout</button>}
      </header>
    </div>
  );
}

export default Home;

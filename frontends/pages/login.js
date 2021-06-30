import Link from 'next/link';
import axios from 'axios'
//import Login from '../comps/login';
import { useRouter } from 'next/router'
import { UserContext } from '../contexts/userContext.js'
import React, { useState, useContext,useEffect } from 'react';
import {tokenRequest,logoutUser,BASE_URL} from '../api/auth.js'

export default function Login() {
  const {user, setUser, isUserLoggedIn} = useContext(UserContext)
  const ACCESS_TOKEN = 'access_token'
  const REFRESH_TOKEN = 'refresh_token'
  const router = useRouter()
  //console.log(isUserLoggedIn)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const loginUser = (username, password) => {
  if(process.browser){
    const loginBody = {username: username, password: password}

    return tokenRequest.post(`/api/token/both/`, loginBody)
      .then((response)=> {
        window.localStorage.setItem(ACCESS_TOKEN, response.data.access);
        window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        return Promise.resolve(response.data);
      }).catch((error)=>{
        return Promise.reject(error);
      });
  }
}

    let tokenRequest = axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
    })

  const onLoginFormSubmit = (event) => {
    event.preventDefault();
    if (!isValidForm()){
      return
    }
    loginUser(username, password).then((data)=>{
      setUser({username: username});
      router.push('/');
    }).catch((error)=> {
      setError('error is there')//error)
    })
  }
  const isValidForm = () => {
    setError("")
    if (username === "" || password === ""){
      setError("Try a Real password and Username");
      return false;
    }
    return true;
  }
  // eslint-disable-next-line no-unused-vars
  const logout = () => {
    logoutUser()
    setUser(null);
  }
  return (

    <main>
        {isUserLoggedIn ? (
              <div>
                <h1>You have already logged in if you <a onClick={logout}>logged out</a></h1>
                <button onClick={logout}>logout</button>
              </div>
        ) : (
              <div>
        <h1>
          Sign in
        </h1>
        <form onSubmit={onLoginFormSubmit} method="POST">
          <input
            type="text"
            required
            id="username"
            label="User Name"
            name="username"
            autoFocus
            onChange={(event)=>{setUsername(event.target.value)}}
          />
          <input
            type="password"
            required
            name="password"
            label="Password"
            onChange={(event)=>{setPassword(event.target.value)}}
          />
          <button
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign In
          </button>
        </form>
        </div>
        )}
      <p style={{color: 'blue'}}>{error}</p>
    </main>

  )
}


//export default Logins;

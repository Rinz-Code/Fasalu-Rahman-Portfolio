import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from '../contexts/userContext.js'
import { loginUser, logoutUser } from '../api/auth.js'
import Link from 'next/link';

// Hook to get query params.
// this could be refactored to somewhere else for future contributors.
function useQueryParams () {
  return new URLSearchParams(useLocation().search);
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Fasal Cheekode Creative Corner
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  // eslint-disable-next-line no-unused-vars
  const {user, setUser, isUserLoggedIn} = useContext(UserContext)
  if (process.browser) {
    console.log(isUserLoggedIn)
  }
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const onLoginFormSubmit = (event) => {
    event.preventDefault();
    if (!isValidForm()){
      return
    }
    loginUser(username, password).then((data)=>{
      setUser({username: username})
      history.push(getRouteAfterLogin());
    }).catch((error)=> {
      setError()
    })
  }

  const getRouteAfterLogin = () => {
      let route = queryParams.get("next")
    if (route === null) {
      route = "/";
    }
    return route
  }

  const isValidForm = () => {
    setError("")
    if (username === "" || password === ""){
      console.log(isUserLoggedIn)
      setError("username and password can't be empty. try user: test, password: test ${isUserLoggedIn}Rinu")
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
            autoComplete="username"
            autoFocus
            onChange={(event)=>{setUsername(event.target.value)}}
          />
          <input
            type="password"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event)=>{setPassword(event.target.value)}}
          />
          <button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </button>
        </form>
      </div>
      {isUserLoggedIn ? (
        <h1>Great Your LoggedIn</h1>
        <Link href="/"><a>Goto Home Page</a></Link>
      )}
      <p style={{color: 'red'}}>{error}</p>
    </main>

  )
}

export default Login;

import {useState} from 'react';
import { UserContext } from './contexts/userContext';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import { logoutUser } from './api/auth';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

/*const phishing = (            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">DRF SampleJWT React Sample</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                  <Nav.Link as={Link} to="/ping">Ping</Nav.Link>
                  { isUserLoggedIn() ?
                    <Nav.Link as={Link} onClick={logout}>Logout</Nav.Link>

                    :
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  }
                </Nav>
              </Navbar.Collapse>
            </Navbar>)*/

function App() {
  const [user, setUser] = useState(null);
  //const [rinshin, setUser] = useState(null);
  const isUserLoggedIn = () => {
    return !!user;
  }
  const logout = (event) => {
    event.preventDefault();
    logoutUser();
    setUser(null);
  }

  /* referring to <UserContext.Provider value={{user, setUser, isUserLoggedIn}}> and other instances.
  * since the values are stored as variables in context, it's not necessary to escape the values for XSS-sake.
  *///<Container></Container>
  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser, isUserLoggedIn,logout}}>
        <Router>

            <Switch>
                <Route exact path="/login">
                  <Login/>
                </Route>
                <Route exact path="/">
                  <HomePage/>
                   { isUserLoggedIn() ?
                    <button onClick={logout}>Logout</button>

                    :
                    <Link to="/login">Login</Link>
                  }
                </Route>
            </Switch>

        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;


import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AllVolunteer from './components/AllVolunteer/AllVolunteer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Register from './components/Register/Register';
import Donetion from './components/Donetion/Donetion';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [singleVolunteer, setSingleVolunteer] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/donetions">
            <Donetion></Donetion>
          </Route>
          {/* <Route path="/register">
            <Register/>
          </Route> */}
          <PrivateRoute path="/register">
            <Register singleVolunteer={singleVolunteer}></Register>
          </PrivateRoute>
          <Route path="/">
            <AllVolunteer setSingleVolunteer={setSingleVolunteer}></AllVolunteer>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

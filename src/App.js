import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AllTask from './components/AllTask/AllTask';
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
import UserList from './components/UserList/UserList';
import AddTask from './components/AddTask/AddTask';

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
          <Route path="/userList">
            <UserList/>
          </Route>
          <Route path="/addTask">
            <AddTask></AddTask>
          </Route>
          <PrivateRoute path="/register">
            <Register singleVolunteer={singleVolunteer}></Register>
          </PrivateRoute>
          <Route exact path="/">
            <AllTask setSingleVolunteer={setSingleVolunteer}></AllTask>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

import React from 'react';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Borrow from './Components/Borrow/Borrow';
import FourOFour from './Components/FourOFour/FourOFour'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import { Dashboard } from './Components/Dashboard/Dashboard';

function App() {
  // console.log("appJs", userPhone)
  let userPhone = localStorage.getItem("userPhone");
  
  function PrivateRoute ({Component, path}) {
    userPhone = localStorage.getItem("userPhone");
      return (
        <Route 
        path={path}
        render={(props)=> 
          userPhone? <Component {...props} /> : <Redirect to='/'/> 
        }
        />
      )
  }

  return (
    <>
      <Router>
        <Navbar/>
        
        <Switch>
          <Route exact path = '/' component = {Home}  /> 
          <Route exact path = '/signin' component = {SignIn}/>
          <PrivateRoute exact path = '/borrow' Component = {Borrow}/>
          <PrivateRoute exact path='/dashboard' Component={Dashboard} />
          <Route component = {FourOFour} />
        </Switch>

      </Router>
    
    
    
    </>

  );
}

export default App;

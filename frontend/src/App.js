import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import axios from "axios";

import { useHistory } from "react-router-dom";


import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/private-route/PrivateRoute";
import Home from "./components/home/Home";


// Check for token to keep user logged in
if (localStorage.jwtToken) {

  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  //get user from server with token 
  axios.get('http://localhost:4000/user/me').then(res => {
          console.log(res);
         
      
        } ).catch(err =>{
          console.log(err.response.data)
        });

  // // Decode token and get user info and exp
  // const decoded = jwt_decode(token);

  // // Set user and isAuthenticated
  // store.dispatch(setCurrentUser(decoded));

}

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

 

  registerUser = (userData, history) => {
    axios
      .post("/user/register", userData)
      .then(res => history.push("/login")) // re-direct to login on successful register
      .catch(err =>
        console.log(err.response.data)
      );
  };

  loginUser = userData => {
    axios
      .post("/user/login", userData)
      .then(res => {
  
          // Save to localStorage
          // Set token to localStorage
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
  
          // Set token to Auth header
          setAuthToken(token);
  
        
          console.log(token);
  
          //get user with token
          axios.get('http://localhost:4000/user/me').then(res => {
            
  
              this.setState({
                user: res.data
              })
            
              console.log(this.state.user);
          
            } )
            .catch(err =>{
              console.log("error" + err.response.data)
            })

      })
      .catch(err =>
        console.log("error"+ err.response.data)
      );
  };

  logoutUser = () => {

    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    
    this.setState({
      user: null,
    })
  };

  setCurrentUser = userToSet => {
    this.state.user = userToSet;
  };

  componentDidUpdate(){
    console.log("update App")
  }



  
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar logoutUser={this.logoutUser}/>
            <Route exact path="/" render={(props) => (
                  <Landing {...props} registerUser={this.registerUser} user = {this.state.user}/>
              )}/>
            <Route exact path="/register" render={(props) => (
                  <Register {...props} registerUser={this.registerUser} user = {this.state.user}/>
              )}/>

            <Route exact path="/login" render={(props) => (
                  <Login {...props} loginUser={this.loginUser} user = {this.state.user} history = {this.history}/>
              )}/>

              <Route exact path="/home" render={(props) => (
                  <Home /> //{...props} logoutUser={this.logoutUser} user = {this.state.user} history = {this.history}/>
              )}/>

            {/* <Switch>
              <PrivateRoute exact path="/home" user = {this.user} render={(props) => (
                  <Home {...props} user = {this.user}/>
              )}/>
            </Switch> */}
          </div>
        </Router>

      </Provider>
    );
  }
}
export default App;
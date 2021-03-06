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

import NewClub from "./components/club/NewClub";
import JoinClub from "./components/club/JoinClub";
import ConfirmClub from "./components/club/ConfirmClub";
import ClubPage from "./components/club/page/ClubPage";
import AdminPage from "./components/club/page/AdminPage";





class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,

      gamerClub: {
        club: {
         
        }

      },
    };
    
    this.checkStorage = this.checkStorage.bind(this)

    this.checkStorage()

  }

  /**
   * checks if user has logged in before 
   */
  checkStorage(){
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {

      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);

      //get user from server with token 
      axios.get('user/me').then(res => {

              this.setState({
                user: res.data
              })
            } ).catch(err =>{
              console.log(err.response.data)
            });
    }

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
  
        
  
          //get user with token
          axios.get('user/me').then(res => {
            
  
              this.setState({
                user: res.data
              })
            
          
            } )
            .catch(err =>{
              console.log(err.response.data)
            })

      })
      .catch(err =>
        console.log(err.response.data)
      );
  };

  logoutUser = () => {

    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("clubid");

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
  }

  onGamerClubUpdate = newClub => {
    if(newClub.postscomments){
      newClub.postscomments.reverse()
    }
    this.setState({
      gamerClub: newClub
    })

    localStorage.setItem( 'clubid', newClub.club.id );
  }



  
  render() {

    return (

        <Router>
          <div className="App">
            <Navbar logoutUser={this.logoutUser} user = {this.state.user}/>
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
                  <Home {...props} logoutUser={this.logoutUser} user = {this.state.user} history = {this.history} onGamerClubUpdate = {this.onGamerClubUpdate}/>
              )}/>

            <Route exact path="/hostclub" render={(props) => (
                  <NewClub {...props} logoutUser={this.logoutUser} user = {this.state.user} history = {this.history} onGamerClubUpdate = {this.onGamerClubUpdate} gamerClub = {this.state.gamerClub}/>
              )}/>

            <Route exact path="/joinclub" render={(props) => (
                  <JoinClub {...props} logoutUser={this.logoutUser} user = {this.state.user} history = {this.history}/>
              )}/>

            <Route exact path="/confirmclub" render={(props) => (
                  <ConfirmClub {...props} logoutUser={this.logoutUser} user = {this.state.user} history = {this.history} gamerClub = {this.state.gamerClub}/>
              )}/>
 
            <Route exact path="/clubpage" render={(props) => (
                  <ClubPage {...props} logoutUser={this.logoutUser} user = {this.state.user} history = {this.history} gamerClub = {this.state.gamerClub} onGamerClubUpdate = {this.onGamerClubUpdate}/>
              )}/>

            <Route exact path="/adminpage" render={(props) => (
                  <AdminPage {...props} logoutUser={this.logoutUser} user = {this.state.user} history = {this.history} gamerClub = {this.state.gamerClub} onGamerClubUpdate = {this.onGamerClubUpdate}/>
              )}/>


            {/* <Switch>
              <PrivateRoute exact path="/home" user = {this.user} render={(props) => (
                  <Home {...props} user = {this.user}/>
              )}/>
            </Switch> */}
          </div>
        </Router>

    );
  }
}
export default App;
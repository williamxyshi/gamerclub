import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import axios from "axios";


import Carousel from "./Carousel";
import ClubList from "./ClubList";
import M from "materialize-css";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            clublist: []
        }
        this.getClubList = this.getClubList.bind(this)
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, {duration: 200});
        this.getClubList()
    }

    getClubList(){
        let postData = {}
        axios.post('games/getclubsforhome', postData)   
            .then(res => { 
                    this.setState({
                        clublist: res.data
                    })
                  } ).catch(err =>{
                    console.log(err)
                  });
            }



	render() {
		return (
            <div style={{ height: "75vh"}} className="container halign-wrapper">


                <Carousel/>


                <div className="col s12 center-align" style={{marginTop: -10}}>
                    <Link to="/joinclub"class="waves-effect waves-light btn" style={{
                        background: "#000",
                        marginRight: 5, 
                        fontFamily: "monospace" 
                    }}>Join a Club</Link>

                     <p class="waves-effect waves-light btn disabled" style={{
                        background: "#000",
                        marginRight: 5,  
                        marginLeft: 5,     
                        fontFamily: "monospace"        
                    }}>Currently Most Popular Games</p>

                     <Link to="/hostclub" class="waves-effect waves-light btn" style={{
                        background: "#000",
                        marginRight: 5,  
                        marginLeft: 5, 
                        fontFamily: "monospace" 
                    }}>Host a Club</Link>
                </div>


                <p style ={{ 
                    
                    fontSize: "3.5vh",
                             fontFamily: "monospace", 
                             marginBottom: 0}}>Your Clubs:</p>

            <ClubList history = {this.props.history} onGamerClubUpdate = {this.props.onGamerClubUpdate} clublist={this.state.clublist}/>
            </div>
		);
	}
}
export default withRouter(Home);
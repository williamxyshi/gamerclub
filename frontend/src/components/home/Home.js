import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import Carousel from "./Carousel";
import ClubList from "./ClubList";
import M from "materialize-css";

class Home extends Component {
    componentDidMount() {
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, {duration: 200});
    }
	render() {
		return (
            <div style={{ height: "75vh"}} className="container halign-wrapper">


                <Carousel/>


                <div className="col s12 center-align" style={{marginTop: -10}}>
                    <a class="waves-effect waves-light btn" style={{
                        background: "#000",
                        marginRight: 5, 
                        fontFamily: "monospace" 
                    }}>Join a Club</a>

                     <a class="waves-effect waves-light btn" style={{
                        background: "#000",
                        marginRight: 5,  
                        marginLeft: 5,     
                        fontFamily: "monospace"        
                    }}>Host a Club with this Game</a>

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

            <ClubList />
            </div>
		);
	}
}
export default withRouter(Home);
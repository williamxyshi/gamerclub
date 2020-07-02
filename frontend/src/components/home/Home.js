import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import Carousel from "./Carousel";
import M from "materialize-css";

var featuredList = [
  {
      gameTitle: "BioShock",
      gameLink: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/BioShock_cover.jpg/220px-BioShock_cover.jpg"
  },
  {
      gameTitle: "Witcher 3",
      gameLink: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
  },
  {
    gameTitle: "BioShock",
    gameLink: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/BioShock_cover.jpg/220px-BioShock_cover.jpg"
},
{
    gameTitle: "Witcher 3",
    gameLink: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
},
{
    gameTitle: "BioShock",
    gameLink: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/BioShock_cover.jpg/220px-BioShock_cover.jpg"
},
{
    gameTitle: "Witcher 3",
    gameLink: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
},
]
class Home extends Component {
    componentDidMount() {
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, {duration: 200});
    }
	render() {
		return (
            <div style={{ height: "75vh"}} className="container halign-wrapper">


                <Carousel/>


                <div className="col s12 center-align" style={{marginTop: -40}}>
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

                     <a class="waves-effect waves-light btn" style={{
                        background: "#000",
                        marginRight: 5,  
                        marginLeft: 5, 
                        fontFamily: "monospace" 
                    }}>Host a Club</a>
                </div>

                <p style ={{ fontSize: "3vh",
                             fontFamily: "monospace"}}>Your Clubs:</p>

            <ul>
                {featuredList.map(item => (
                <img src={item.gameLink}/>
                ))}
            </ul>
            </div>
		);
	}
}
export default withRouter(Home);

const styles = {
    carouselStyle: {
        height: "100%",
        overflow: "unset"
    }
}
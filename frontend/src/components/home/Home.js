import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

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
]
class Home extends Component {

	render() {
		// const { index, direction } = this.state;

		return (
            <div style={{ height: "75vh" }} className="container halign-wrapper">
                    
                <b style ={{ fontSize: "3vh"}}>Featured Games</b>
                <Carousel>
                    <div>
                        <img src="https://cdn.cnn.com/cnnnext/dam/assets/181205104053-01-turtle-plastic-super-tease.jpg" />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src="https://cdn.cnn.com/cnnnext/dam/assets/181205104053-01-turtle-plastic-super-tease.jpg" />
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <img src="https://cdn.cnn.com/cnnnext/dam/assets/181205104053-01-turtle-plastic-super-tease.jpg" />
                        <p className="legend">Legend 3</p>
                    </div>
                </Carousel>
            </div>
		);
	}
}
export default withRouter(Home);
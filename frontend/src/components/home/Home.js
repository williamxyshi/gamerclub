import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link, Redirect, withRouter } from "react-router-dom";
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
  let styles = {


    image: {

        height: 375,
        width: 275,
        borderRadius: 10,
    }
}
  return (
        <div style={{ height: "75vh" }} className="container halign-wrapper">
          
            <b style ={{ fontSize: "3vh"}}>Featured Games</b>

     

          <ul>
            {featuredList.map(item => (
                <img style = {styles.image} src={item.gameLink} />
          
  
            ))}

          </ul>

        </div>
      );
  }
}
export default withRouter(Home);
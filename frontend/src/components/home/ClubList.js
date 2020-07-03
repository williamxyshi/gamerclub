import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

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

class ClubList extends Component {

    
  render() {
    var styles = {
        image: {
            height: 255,
            width: "auto"
        }
    }

    return (
        <ul>
            {featuredList.map(item => (
                <img src={item.gameLink}/>
            ))}
        </ul>
    );
  }
}

export default ClubList;
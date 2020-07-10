import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import './ListItem.css';

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
    
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
      }

    
      /**
       * 
       * passing in index, here we should
       * link to specific club page.
       */
    onClickHandler(index){
        console.log(index)
    }

    
  render() {
    var styles = {
        imageContainer: {
            margin: 7,
            display: "inline-block",
            textAlign: "center",
     
        },


        image: {
            margin: -2,
            height: 240,
            width: 180,
            boxShadow: "1px 3px 1px #000",
            borderRadius: 10,
 
        },
        text: {
            left: "50%",
            fontFamily: "Courier New",
            fontSize: "medium",
 
        }
    }

    return (
        <ul style={{
            position: "absolute",
            left: "10%",
        }}>
            {featuredList.map((item, index) => (
                <div className="itemContainer" style={styles.imageContainer}>

                    {/* <img src={item.gameLink} style={styles.image} className="image"/>
                    <div className="overlay">
                        {/* <div className="text">Hello World</div> */}

                        <div class="content">
                            <a target="_blank">
                                <div class="content-overlay"></div>
                                <img class="content-image" src={item.gameLink}/>
                                <div class="content-details fadeIn-bottom">
                                    <button class="waves-effect waves-light btn-small" onClick={this.onClickHandler.bind(this, index)}>View Club</button>
                                </div>
                            </a>
                        </div>

                    <b style={styles.text}>Justin's Gamer Club</b>                        


                </div>

            ))}
        </ul>
    );
  }
}

export default ClubList;
import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import './ListItem.css';
import axios from "axios";


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
       * link to specific club page
       */
    onClickHandler(index){
        console.log(index)

        axios.post('http://localhost:4000/games/getclub', {
            clubid: this.props.clublist.clublist[index].clubid
        })
        
        .then(res => {

                this.props.onGamerClubUpdate(res.data)
            
                this.props.history.push("/clubpage")

        
            } ).catch(err =>{
            console.log(err)
            });


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


    var clublist = []
    if(this.props.clublist.clublist) {
        /**
         * this flips it so that it's in chronological order :) 
         */
        clublist = this.props.clublist.clublist
    }

    if(clublist.length == 0){
        return(
            <div style={{fontFamily: "Courier New"}}>

                Join a club for it to appear here
            </div>

        )
    }

    return (
        <ul style={{
            position: "absolute",
            left: "10%",
        }}>
            {clublist.map((item, index) => (
                <div className="itemContainer" style={styles.imageContainer}>

                    {/* <img src={item.gameLink} style={styles.image} className="image"/>
                    <div className="overlay">
                        {/* <div className="text">Hello World</div> */}

                        <div class="content">
                            <a target="_blank">
                                <div class="content-overlay"></div>
                                <img class="content-image" src={item.posterurl}/>
                                <div class="content-details fadeIn-bottom">
                                    <button class="waves-effect waves-light btn-small" onClick={this.onClickHandler.bind(this, index)}>View Club</button>
                                </div>
                            </a>
                        </div>

                    <b style={styles.text}>{item.clubname}</b>                        


                </div>

            ))}
        </ul>
    );
  }
}

export default ClubList;
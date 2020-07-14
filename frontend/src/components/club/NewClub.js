import React, { Component } from "react";

import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import axios from "axios";


import M from "materialize-css";

import './joinclub.css';
var generator = require('generate-password');

/**
 * test server results list
 */
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

]

class NewClub extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            searchString: "",
            serverResult: [],
            chosenGame: "",
            clubName: "",

            clubData: null,
          };

        this.timeout =  0;

        this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onChooseGameHandler = this.onChooseGameHandler.bind(this);
        this.onClubNameChangeHandler = this.onClubNameChangeHandler.bind(this);

        console.log("user:" + this.props.user)
      }

      /**
       * checks fields and submits club data to server,
       * on success, will return the club back and we should proceed
       * to confirmation screen
       */

    onClickHandler(){

        var shouldReturn = false
        if(!this.state.clubName){
            M.toast({html: 'please enter a club name', classes: 'rounded'})
            shouldReturn = true
        }
        if(!this.state.chosenGame){
            M.toast({html: 'please choose a game to play', classes: 'rounded'})
            shouldReturn = true;
        }

        if(shouldReturn)return;

        var password = generator.generate({
            length: 5,
            numbers: true
        });

      

        const clubData = {
            clubname: this.state.clubName,
            id: password,
            adminemail: this.props.user.email,
            currentgame: this.state.chosenGame
        }
        console.log(clubData)
        

        axios.post('http://localhost:4000/games/createclub', clubData)
        
        .then(res => {
            
                this.props.onGamerClubUpdate(res.data);

                this.props.history.push("/confirmclub")
            
               
            
              } ).catch(err =>{
                console.log(err)
              });


    }
    /**
     * 
     * sets the chosen game, ie. bioshock
     */

    onChooseGameHandler(e){

        this.setState({
            chosenGame: this.state.serverResult[e][0]
        })


    }

    /**
     * 
     * setting club name
     */
    onClubNameChangeHandler(e){
        this.state.clubName = e.target.value
    }

    /**
     * searching games from server and returning game name and poster image
     * we search after theres been no keyboard input for 200 ms.
     */
    onSearchChangeHandler(e){

        var text = e.target.value

        /**
         * will this lag? Investigate if the lag is okay or not.
         */

        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            axios.get('http://localhost:4000/games/getgame?gamename=' + text).then(res => {

                this.setState({
                    serverResult: res.data
                })
    
    
                console.log(this.state.serverResult)
               
            
              } ).catch(err =>{
                console.log(err)
              });
    
        }, 200);

       


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
                color: "white"
     
            }
        }
    
		return (
            <div style={{ height: "75vh"}} className="container halign-wrapper">
                    <div class="input-field col s6">
                        <input id="input_text" type="text" data-length="10" onChange={this.onClubNameChangeHandler}/>
                        <label for="input_text">club name</label>
                    </div>

                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">search</i>
                            <input id="icon_prefix" type="text" class="validate" onChange={this.onSearchChangeHandler}/>
                            <label for="icon_prefix">what's the first game you will play?</label>
                        </div>
                     </div>

           
                    <div style={{
                        background: "#000",
                        height: "45%",
                        marginTop: -15,
                        borderRadius: 10,

                    }}>
                        


                    {this.state.serverResult.map((item, index) => (
                        <div className="itemContainer" style={styles.imageContainer}>

                    
                                    <div class="content">
                                        <a target="_blank">
                                            <div class="content-overlay"></div>
                                            <img class="content-image" src={item[1]}/>
                                            <div class="content-details fadeIn-bottom">
                                                <button class="waves-effect waves-light btn-small" onClick={this.onChooseGameHandler.bind(this, index)}>choose</button>
                                            </div>
                                        </a>
                                    </div>

                            <b style={styles.text}>{item[0]}</b>                        


                        </div>

                        ))}



                    </div>

                
                <div class="row">
        
                    <b>Your club will play: {this.state.chosenGame}</b>
                </div>

                     <button class="waves-effect waves-light btn-large" style={{
                        background: "#000",
                        marginTop: 50,
                        marginRight: 5,  
                        marginLeft: 5,     
                        fontFamily: "monospace"        
                    }} onClick={this.onClickHandler}>Create Club</button>
        
            </div>


        
		);
	}
}
export default withRouter(NewClub);
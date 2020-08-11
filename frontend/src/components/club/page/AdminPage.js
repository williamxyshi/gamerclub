import React, { Component } from "react";

import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import DatePicker from "react-datepicker";
import axios from "axios";

import styles from "./AdminPage.css"


import M from "materialize-css";

var newDate = ""


class AdminPage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {

            newDescription : "",
            newDate: "",
            currentClub: null,


            searchString: "",
            serverResult: [],
            chosenGame: "",
            posterurl: "",




        }

        this.handleOutput = this.handleOutput.bind(this) 
        this.onSaveDeadline = this.onSaveDeadline.bind(this)
        this.onCancelPressed = this.onCancelPressed.bind(this)


        this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
       
        this.onChooseGameHandler = this.onChooseGameHandler.bind(this);

        this.onSaveGame = this.onSaveGame.bind(this);
      }


      onSaveGame() {

        var canPass = true

        if(this.state.chosenGame == ""){
            canPass = false
            M.toast({html: 'please choose a game', classes: 'rounded'})

        }

        if(this.state.posterurl == "" && canPass){
            canPass = false
            M.toast({html: 'something went wrong, please try again', classes: 'rounded'})

        }

        if(canPass){

            const postData = {
                clubid: this.state.currentClub,
                currentgame: this.state.chosenGame,
                posterurl: this.state.posterurl
            }
            console.log(postData)
    
            axios.post('http://localhost:4000/games/changegame', postData)
            
            .then(res => {
                
                    this.props.onGamerClubUpdate(res.data);
                    M.toast({html: 'club updated!', classes: 'rounded'})
                
                   
                
                  } ).catch(err =>{
                    console.log(err)
                  });
    





            }

    }


      componentDidMount() {
        var elems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(elems,  {
            onSelect:function(){
              var date = String(instances[0].date).split(" ");

            
           
            newDate = date[1] + " " + date[2] + ", " + date[3]
              

          
            }
          });

        let el = document.querySelector('.tabs');
        let instance = M.Tabs.init(el, {});


        if(!this.props.gamerClub.club.clubname){

            let id = localStorage.getItem( 'clubid' )
    
    
            axios.post('http://localhost:4000/games/getclub', {
                clubid: id
            })
            
            .then(res => {
                    this.props.onGamerClubUpdate(res.data)

        
        
            
                } ).catch(err =>{
                console.log(err)
                });
        } else {


        }

    }

    onChooseGameHandler(e){

        this.setState({
            chosenGame: this.state.serverResult[e][0],
            posterurl: this.state.serverResult[e][1]
        })


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

    onCancelPressed(){
        this.props.history.push("/clubpage")
    }

    onSaveDeadline(){

        var canPass = true

        if(newDate == ""){
            canPass = false
            M.toast({html: 'please select a date', classes: 'rounded'})

        }

        if(this.state.newDescription == ""){
            canPass = false
            M.toast({html: 'please enter a description', classes: 'rounded'})

        }

        if(canPass){

            const postData = {
                clubid: this.state.currentClub,
                newdeadline: newDate,
                deadlinedescription: this.state.newDescription
            }
            console.log(postData)
    
            axios.post('http://localhost:4000/games/changedeadline', postData)
            
            .then(res => {
                
                    this.props.onGamerClubUpdate(res.data);
                    M.toast({html: 'club updated!', classes: 'rounded'})
                
                   
                
                  } ).catch(err =>{
                    console.log(err)
                  });
    

        }

        

    }


    handleOutput(e){
        this.state.newDescription = e.target.value
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
            <div style={{ height: "75vh"}} className="container halign-wrapper" >
            
                  <div style={{marginTop: 45}}className="col s12 left-align">
                        <h5>
                            <b style = {styles.text}>edit club settings</b>
                        </h5>
                    </div>


                    <div>
                        <div class="col s12">
                            <ul class="tabs" style={{fontFamily:"Courier New"}}>
                                <li class="tab col s3"><a class="active" href="#test1">Deadline Settings</a></li>
                                <li class="tab col s3"><a href="#test2">Currently Playing Game</a></li>
                                <li class="tab col s3"><a href="#test3">Add a Post</a></li>
                           

                            </ul>
                        </div>
                        <div id="test1">
                            
                                    <div class="input-field col s6">
                                        <b style={{fontFamily: "Courier New"}}>Deadline Description:</b>
                                        <input style={{fontFamily:"monospace"}} id="input_text" type="text" onChange={this.handleOutput}/>
                                    </div>

                                    <div class="input-field col s6" style={{fontFamily: "Courier New"}}>
                                        <b>Deadline Date:</b>
                                        <input type="text" class="datepicker" 
                                        
                                        style={{width: "25%", marginLeft: 10, fontFamily: "monospace"}}/>


                  
                                    </div>

                                    <div className="col s12 center-align" style={{marginTop: 10}}>
                                        <button class="waves-effect waves-light btn" 

                                        onClick={this.onCancelPressed}
                                        
                                        style={{
                                            background: "#fff",
                                            marginRight: 5,  
                                            marginLeft: 5,     
                                            color: "#000",
                                            fontFamily: "monospace"
                                        }}>Back to Club</button>


                                        <button class="waves-effect waves-light btn" 

                                            onClick={
                                                (event) => {

                                                    this.state.currentClub = this.props.gamerClub.club.id
                                                    this.onSaveDeadline()
                                                
                                                }
                                                }                                                
                                               
                                            
                                            style={{
                                                background: "#000",
                                                marginRight: 5,  
                                                marginLeft: 5,     
                                                fontFamily: "monospace"        
                                            }}>Save</button>
                                    </div>

                        </div>

                        <div id="test2" class="col s12">
                                <div class="row">
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">search</i>
                                    <input id="icon_prefix" type="text" class="validate" onChange={this.onSearchChangeHandler}/>
                                    <label for="icon_prefix">search game</label>
                                </div>
                                </div>

           
                                <div style={{
                                    background: "#000",
                                    height: 300,
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

                                    <div className="col s12 center-align" style={{marginTop: 10}}>
                                        <button class="waves-effect waves-light btn" 

                                        onClick={this.onCancelPressed}
                                        
                                        style={{
                                            background: "#fff",
                                            marginRight: 5,  
                                            marginLeft: 5,     
                                            color: "#000",
                                            fontFamily: "monospace"
                                        }}>Back to Club</button>


                                        <button class="waves-effect waves-light btn" 

                                            onClick={
                                                (event) => {

                                                    this.state.currentClub = this.props.gamerClub.club.id
                                                    this.onSaveGame()
                                                
                                                }
                                                }                                                
                                               
                                            
                                            style={{
                                                background: "#000",
                                                marginRight: 5,  
                                                marginLeft: 5,     
                                                fontFamily: "monospace"        
                                            }}>Save</button>
                                    </div>




                        </div>
                        <div id="test3" class="col s12">
                                            














                                                <div className="col s12 center-align" style={{marginTop: 10}}>
                                                                <button class="waves-effect waves-light btn" 

                                                                onClick={this.onCancelPressed}
                                                                
                                                                style={{
                                                                    background: "#fff",
                                                                    marginRight: 5,  
                                                                    marginLeft: 5,     
                                                                    color: "#000",
                                                                    fontFamily: "monospace"
                                                                }}>Back to Club</button>


                                                                <button class="waves-effect waves-light btn" 

                                                                    onClick={
                                                                        (event) => {

                                                                            this.state.currentClub = this.props.gamerClub.club.id
                                                                            this.onSaveGame()
                                                                        
                                                                        }
                                                                        }                                                
                                                                    
                                                                    
                                                                    style={{
                                                                        background: "#000",
                                                                        marginRight: 5,  
                                                                        marginLeft: 5,     
                                                                        fontFamily: "monospace"        
                                                                    }}>Save</button>
                                                            </div>
                        </div>
                

                    </div>



                    














         



            





            </div>
                
        
		);
	}
}
export default withRouter(AdminPage);
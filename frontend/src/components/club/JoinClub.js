import React, { Component } from "react";

import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import axios from "axios";


import M from "materialize-css";


var generator = require('generate-password');



class JoinClub extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            clubid: ""
        }

        this.handleOutput = this.handleOutput.bind(this)
        this.handleJoinClub = this.handleJoinClub.bind(this)
      }


    handleOutput(e){
        this.state.clubid = e.target.value
    }


    handleJoinClub(){

        var shouldReturn = false
        if(this.state.clubid == ""){
            M.toast({html: 'please enter a club ID', classes: 'rounded'})
            shouldReturn = true
        }
        if(shouldReturn)return;

        const postdata = {
            id: this.state.clubid
        }
        

        axios.post('http://localhost:4000/games/joinclub', postdata)
        
        .then(res => {

                this.props.onGamerClubUpdate(res.data);

                this.props.history.push("/home")
            
               
            
              } ).catch(error =>{
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);

                    if(error.response.data.msg){
                        let text = String(error.response.data.msg)
                        M.toast({html: text, classes: 'rounded'})
                    }
    
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
              });


    }



	render() {

        var styles = {
            container: {
                margin: 7,
                display: "inline-block",
                textAlign: "center",
         
            },
            text: {
                left: "50%",
                fontFamily: "Courier New"
    
     
            }

        }
    
		return (
            <div style={{ height: "75vh"}} className="container halign-wrapper" >
            
                  <div style={{marginTop: 120}}className="col s12 center-align">
                        <h5>
                            <b style = {styles.text}>enter your club code below</b>
                        </h5>
                    </div>

                    <div class="input-field col s12" style={{ marginLeft: "20%", marginRight: "20%"}}>
                        <i class="material-icons prefix">confirmation_number</i>
                        <input id="icon_prefix" type="text" class="validate" onChange={this.handleOutput}/>
                        <label for="icon_prefix">Club ID</label>

            
                    </div>

                    <div style={{marginTop: 20}}className="col s12 center-align">

                    <button class="waves-effect waves-light btn-large"  style={{
        
                        background: "#000",
                        fontFamily: "monospace"        
                    }}
                    
                    onClick = {this.handleJoinClub}
                    
                    >join</button>
                    </div>





            </div>
                
        
		);
	}
}
export default withRouter(JoinClub);
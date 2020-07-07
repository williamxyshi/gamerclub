import React, { Component } from "react";

import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import axios from "axios";


import M from "materialize-css";


var generator = require('generate-password');



class JoinClub extends Component {
    
    constructor(props) {
        super(props);

        this.handleOutput = this.handleOutput.bind(this)

    
      }


    handleOutput(e){
        console.log("handle output " + e.target.value)
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
            <div style={{ height: "75vh"}} >
            
                  <div style={{marginTop: 120}}className="col s12 center-align">
                        <h5>
                            <b style = {styles.text}> to join, enter your club code below </b>
                        </h5>
                    </div>

                    <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="text" class="validate"/>
                    <label for="icon_prefix">First Name</label>
                    </div>


            </div>
                
        
		);
	}
}
export default withRouter(JoinClub);
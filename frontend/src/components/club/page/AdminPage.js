import React, { Component } from "react";

import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import axios from "axios";


import M from "materialize-css";




class AdminPage extends Component {
    
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
            <div style={{ height: "75vh"}} className="container halign-wrapper" >
            
                  <div style={{marginTop: 120}}className="col s12 center-align">
                        <h5>
                            <b style = {styles.text}>enter your club code below</b>
                        </h5>
                    </div>

                    <div class="input-field col s12" style={{ marginLeft: "20%", marginRight: "20%"}}>
                        <i class="material-icons prefix">confirmation_number</i>
                        <input id="icon_prefix" type="text" class="validate"/>
                        <label for="icon_prefix">Club ID</label>

            
                    </div>

                    <div style={{marginTop: 20}}className="col s12 center-align">

                    <button class="waves-effect waves-light btn-large"  style={{
        
                        background: "#000",
                        fontFamily: "monospace"        
                    }}>join</button>
                    </div>





            </div>
                
        
		);
	}
}
export default withRouter(AdminPage);
import React, { Component } from "react";

import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 


import M from "materialize-css";

var generator = require('generate-password');

class NewClub extends Component {

    onClickHandler(){
        var password = generator.generate({
            length: 5,
            numbers: true
        });

        console.log(password)
    }


	render() {
		return (
            <div style={{ height: "75vh"}} className="container halign-wrapper">
                    <div class="input-field col s6">
                        <input id="input_text" type="text" data-length="10"/>
                        <label for="input_text">club name</label>
                    </div>

                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">search</i>
                            <input id="icon_prefix" type="text" class="validate"/>
                            <label for="icon_prefix">what's the first game you will play?</label>
                        </div>
                     </div>

           
                    <div style={{
                        background: "#000",
                        height: "45%",
                        marginTop: -15,
                        borderRadius: 10,

                    }}/>

                
                <div class="row">
        
           
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
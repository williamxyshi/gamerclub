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


      componentDidMount() {
        var elems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(elems, {duration: 200});

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
            
                  <div style={{marginTop: 45}}className="col s12 left-align">
                        <h5>
                            <b style = {styles.text}>edit club settings</b>
                        </h5>
                    </div>


                    <div class="input-field col s6">
                        <input id="input_text" type="text" data-length="10" onChange={this.onClubNameChangeHandler}/>
                        <label for="input_text">deadline description</label>
                    </div>

                    <input type="text" class="datepicker"/>


                    <div className="col s12 center-align" style={{marginTop: 10}}>
         

                        <a class="waves-effect waves-light btn" style={{
                            background: "#fff",
                            marginRight: 5,  
                            marginLeft: 5,     
                            color: "#000",
                            fontFamily: "monospace"        
                        }}>Cancel</a>


                        <a class="waves-effect waves-light btn" style={{
                            background: "#000",
                            marginRight: 5,  
                            marginLeft: 5,     
                            fontFamily: "monospace"        
                        }}>Save</a>
                    </div>



            





            </div>
                
        
		);
	}
}
export default withRouter(AdminPage);
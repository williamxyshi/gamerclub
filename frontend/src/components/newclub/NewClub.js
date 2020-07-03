import React, { Component } from "react";

import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 


class NewClub extends Component {

	render() {
		return (
            <div style={{ height: "75vh"}} className="container halign-wrapper">
                    <div class="input-field col s6">
                        <input id="input_text" type="text" data-length="10"/>
                        <label for="input_text">Club Name</label>
                    </div>
        
            </div>


        
		);
	}
}
export default withRouter(NewClub);
import React, { Component } from "react";
import { Link, Router, withRouter } from "react-router-dom";
import { FullPage, Slide } from 'react-full-page';

class Landing extends Component {

  /**
   * if user is signed in, just push to home page
   */
  componentWillMount(){
    if(this.props.user != null){
      this.props.history.push("/home")
    }
  }

  render() {
    return (

    
      <FullPage>
        <Slide>
              
            <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="col s12 center-align">
                <h4>
                  <b>Host</b> and <b>Join</b> clubs for gamers to play together
                </h4>

                <p className="flow-text grey-text text-darken-1">
                  participate in indepth discussion of video games
                </p>


                <br/>


                <div className="col s6">
                  <Link
                    to="/register"
                    style={{
                      width: "140px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                    Register
                  </Link>
                </div>
                <div className="col s6">
                  <Link
                    to="/login"
                    style={{
                      width: "140px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large btn-flat waves-effect white black-text">
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
        </Slide>
        <Slide>
          <h1>Another slide content</h1>
        </Slide>
      </FullPage>
 
    );
  }
}


export default withRouter(Landing);
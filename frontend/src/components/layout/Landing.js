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
                <h4 style={{}}>
                  The best platform to <b>Create/Join</b> video game clubs
                </h4>

                {/* <p className="flow-text grey-text text-darken-1">
                  Get started for free now
                </p> */}

                <br/>


                <div className="col s6">
                  <Link
                    to="/register"
                    style={{
                      width: "140px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable black">
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
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="col s12 center-align">
                <h4>
                  Gamer Club Features:
                </h4>

              


                <div className="col s12">
            
                • Host video game clubs to easily organize discussion for video games <br></br>
                • Join game clubs using a unique 5 digit code <br></br>
                • Set checkpoint deadlines, and poll for completion rates <br></br>
                • Create discussion posts, and comment on them <br></br>
                • View currently most popular video games <br></br>


                </div>
              </div>
            </div>
          </div>
        </Slide>
      </FullPage>
 
    );
  }
}


export default withRouter(Landing);
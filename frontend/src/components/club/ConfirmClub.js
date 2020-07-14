import React, { Component } from "react";
import { Link, Router, withRouter } from "react-router-dom";
class Landing extends Component {

  componentWillMount(){


  }



  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
          Club Created
      </div>
    );
  }
}


export default withRouter(Landing);
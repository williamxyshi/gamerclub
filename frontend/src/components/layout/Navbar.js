import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();

      
    this.props.history.push("/")
  };

  render() {
    return (
      <div className="navbar-fixed">
        <nav style={{height: "8vh"}}>
          <div className="nav-wrapper white">
            <Link
              to="/home"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">videogame_asset</i>
              <b>Gamer Club</b>
            </Link>
          </div>
        </nav>

        <button
                style={{
                  width: "100px",
                  borderRadius: "3px",
                  marginTop: "1rem",
                  left: "90%"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                >

                Logout
        </button>

      </div>
    );
  }
}
export default withRouter(Navbar);
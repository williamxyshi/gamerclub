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
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">videogame_asset</i>
              Gamer Club
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
import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import PrivateRoute from "../private-route/PrivateRoute";
import Home from "../home/Home";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

  }
componentWillReceiveProps(nextProps) {
    console.log("ey")
    if (nextProps.user != {}) {
      console.log("ey2")
      this.props.history.push("/home"); // push user to home when they login
    }

    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
        }
  }


  /**
   * TODO: 
   */
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to home
    console.log("ey")
    if (this.props.user != null) {
      this.props.history.push("/home");
    }
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
    e.preventDefault();

  const userData = {
        email: this.state.email,
        password: this.state.password
      };

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

render() {
    const { errors } = this.state;

    return (
        <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                    <b>Login</b> below
                </h4>
                <p className="grey-text text-darken-1">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                    <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                        invalid: errors.email || errors.emailnotfound
                    })}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                    </span>
                </div>
                <div className="input-field col s12">
                    <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                        invalid: errors.password || errors.passwordincorrect
                    })}
                    />
                    <label htmlFor="password">Password</label>
                    <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                    </span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                    Login
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        );
  }
}
export default withRouter(Login);
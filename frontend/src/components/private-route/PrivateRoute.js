import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (props.user != null) === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);


export default PrivateRoute;
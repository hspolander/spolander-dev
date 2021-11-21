import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import { loginUser } from "./actions";
import LoginForm from "./loginform";

import "./login.scss";

const Login = (props) => {
  const { isAuthenticated } = props
  const location = useLocation();

  const handleSendLoginRequest = (values) => {
    loginUser(values);
  };

  const { from } = location.state || { from: { pathname: "/" } };
  if (isAuthenticated) {
    return <Navigate to={from.pathname} />;
  }
  return (
    <div className="login">
      <LoginForm handleSubmit={handleSendLoginRequest} />
    </div>
  );
};
Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  fetching: state.loginReducer.fetching,
  error: state.loginReducer.error,
});

export default connect(mapStateToProps, null)(Login);

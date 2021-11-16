import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";

import { loginUser, authUser } from "./actions";
import LoginForm from "./loginform";

import "./login.scss";

const Login = () => {
  const location = useLocation();
  useEffect(() => {
    authUser();
  }, []);

  const handleSendLoginRequest = (values) => {
    loginUser(values);
  };

  const { from } = location.state || { from: { pathname: "/" } };
  if (Cookies.get("WINE_UUID")) {
    return <Navigate to={from.pathname} />;
  }
  return (
    <div className="login">
      <LoginForm handleSubmit={handleSendLoginRequest} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  fetching: state.loginReducer.fetching,
  error: state.loginReducer.error,
});

export default connect(mapStateToProps, null)(Login);

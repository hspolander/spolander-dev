import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import LoginForm from "./loginform";

import "./login.scss";
import { useLogin } from "../../contextProviders";
import LoginApi from "../../api/login";

const Login = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useLogin()

  const handleSendLoginRequest = (values) => {
    LoginApi.login(values)
    .then((loginResponse) => {
      console.log({loginResponse})
      setIsLoggedIn(true)
    })
    .error(() => {
      setIsLoggedIn(false)
    })
  };

  const { from } = location.state || { from: { pathname: "/" } };
  if (isLoggedIn) {
    return <Navigate to={from.pathname} />;
  }
  return (
    <div className="login">
      <LoginForm handleSubmit={handleSendLoginRequest} />
    </div>
  );
};

export default (Login);

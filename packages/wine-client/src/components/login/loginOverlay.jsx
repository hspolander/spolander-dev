import React, { useEffect } from "react";

import LoginForm from "./loginform";

import "./login.scss";
import LoginApi from "../../api/login";
import { useLogin } from "../../contextProviders";

const LoginOverlay = () => {
  const [isLoggedIn, setIsLoggedIn] = useLogin()
  const handleSendLoginRequest = (values) => {
    LoginApi.login(values)
    .then(() => {
      setIsLoggedIn(true)
    })
    .catch(() => {
      setIsLoggedIn(false)
    })
  };

  useEffect(() => {
    LoginApi.authRequest()
    .then(() => {
      setIsLoggedIn(true)
    })
    .catch(() => setIsLoggedIn(false))
  }, []);

  return (
    <div>
      {!isLoggedIn && <div className="loginOverlay" />}
      {!isLoggedIn && (
        <div className="login overlay">
          <div className="sessionExpired">
            {" "}
            Din session har tagit slut. Vänligen logga in igen för att
            fortsätta.
          </div>
          <LoginForm handleSubmit={handleSendLoginRequest} />
        </div>
      )}
    </div>
  );
};


export default (LoginOverlay);

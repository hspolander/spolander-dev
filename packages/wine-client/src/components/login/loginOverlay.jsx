import React, { useEffect } from "react";
import { connect } from "react-redux";

import LoginForm from "./loginform";

import "./login.scss";
import LoginApi from "../../api/login";
import { useLogin } from "../../contextProviders";

const LoginOverlay = () => {
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

  useEffect(() => {
    LoginApi.authRequest()
    .then((authResponse) => {
      console.log({authResponse})
      setIsLoggedIn(true)
    })
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

const mapStateToProps = (state) => ({
  redirectToReferrer: state.loginReducer.redirectToReferrer,
  fetching: state.loginReducer.fetching,
  error: state.loginReducer.error,
  redirectedToLogin: state.loginReducer.redirectedToLogin,
});

export default connect(mapStateToProps, null)(LoginOverlay);

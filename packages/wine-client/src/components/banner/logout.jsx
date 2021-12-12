import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


import "./logout.scss";
import LoginApi from "../../api/login";
import { useLogin } from "../../contextProviders";

const Logout = () => {
  const [, setIsLoggedIn] = useLogin()

const onLogout = () => {
  LoginApi.logout()
  .then(() => {
    setIsLoggedIn(false)
  })
}

return (
  <div className="banner-logout">
    <Link className="nostyle-link" onClick={() => onLogout()} to="/">
      <div className="icons-menu">
        <FontAwesomeIcon icon={faSignOutAlt} size="3x" />
        <i className="icon-title">Logga ut</i>
      </div>
    </Link>
  </div>
)};



export default Logout;

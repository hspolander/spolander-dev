import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/winereviewer.png";

import "./logo.scss";

const Logo = () => (
  <div className="banner-logo">
    <Link to="/">
      <img src={logo} alt="Wineglasses" />
    </Link>
  </div>
);

export default Logo;

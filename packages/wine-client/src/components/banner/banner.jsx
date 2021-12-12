import React from "react";

import Logout from "./logout";
import Logo from "./logo";
import Search from "./search/search";

import "./banner.scss";
import { useLogin, useScreenSize } from "../../contextProviders";

const Banner = () => {
  const [isSmallScreen] = useScreenSize()
  const [isLoggedIn] = useLogin()
  return (
    <div className="banner-main">
    <Logo />
    {isLoggedIn && <Search />}
    {!isSmallScreen && isLoggedIn && <Logout />}
  </div>
)}


export default (Banner);

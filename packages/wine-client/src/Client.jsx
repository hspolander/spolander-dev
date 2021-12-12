import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropTypes from 'prop-types';

import Banner from "./components/banner/banner";
import AddReview from "./components/add/AddReview";
import ReviewResult from "./components/result/reviewResult";
import LoginOverlay from "./components/login/loginOverlay";
import Login from "./components/login/login";

import "./client.scss";
import { useLogin, useScreenSize } from "./contextProviders";

const Client = () => {
  const [, setIsSmallScreen] = useScreenSize()
  const [isLoggedIn] = useLogin()

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, []);

  return (
    <Router>
          <div>
            <Banner />
            <div className="main-content">
              <Routes>
                <Route
                  path="/reviews/:table/:property/:value"
                  element={
                    <RequireAuth isLoggedIn={isLoggedIn}>
                      <ReviewResult />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/reviews"
                  element={
                    <RequireAuth isLoggedIn={isLoggedIn}>
                      <ReviewResult />
                    </RequireAuth>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/"
                  element={
                    <RequireAuth isLoggedIn={isLoggedIn}>
                      <AddReview />
                    </RequireAuth>
                  }
                />
              </Routes>
            </div>
          </div>
    </Router>
  );
};

const RequireAuth = (props) => {
  const { children, isLoggedIn } = props;
  return isLoggedIn ? children : <LoginOverlay />
}
RequireAuth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}


export default (Client);

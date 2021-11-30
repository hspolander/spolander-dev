import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import Banner from "./components/banner/banner";
import AddReview from "./components/add/AddReview";
import ReviewResult from "./components/result/reviewResult";
import LoginOverlay from "./components/login/loginOverlay";
import Login from "./components/login/login";
import setScreenSize from "./components/global/actions";

import "./client.scss";
import { authUser } from "./components/login/actions";

const Client = (props) => {
  const  { isAuthenticated } = props
  useEffect(() => {
    authUser()
    if (window.innerWidth <= 1024) {
      setScreenSize(true);
    } else {
      setScreenSize(false);
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
                  <RequireAuth isAuthenticated={isAuthenticated}>
                    <ReviewResult />
                  </RequireAuth>
                }
              />
              <Route
                path="/reviews"
                element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                    <ReviewResult />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/"
                element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
});
Client.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const RequireAuth = (props) => {
  const { children, isAuthenticated } = props;
  return isAuthenticated ? children : <LoginOverlay />
}
RequireAuth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}


export default connect(mapStateToProps, null)(Client);

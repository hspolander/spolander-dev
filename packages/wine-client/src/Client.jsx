import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import PropTypes from 'prop-types'

import Banner from "./components/banner/banner";
import AddReview from "./components/add/AddReview";
import ReviewResult from "./components/result/reviewResult";
import LoginOverlay from "./components/login/loginOverlay";
import Login from "./components/login/login";
import setScreenSize from "./components/global/actions";

import "./client.scss";

const Client = () => {
  useEffect(() => {
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
        {Cookies.get("WINE_UUID") && <LoginOverlay />}
        <div className="main-content">
          <Routes>
            <Route
              path="/reviews/:table/:property/:value"
              element={
                <RequireAuth>
                  <ReviewResult />
                </RequireAuth>
              }
            />
            <Route
              path="/reviews"
              element={
                <RequireAuth>
                  <ReviewResult />
                </RequireAuth>
              }
            />
            <Route path="/"
              element={
                <RequireAuth>
                  <AddReview />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
});

const RequireAuth = (props) => {
  const { children } = props;
  const location = useLocation();
  const isAuthenticated = Cookies.get("WINE_UUID");
  return isAuthenticated ? children : <Navigate to="/login" state={{from:location}} />
}
RequireAuth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}


export default connect(mapStateToProps, null)(Client);

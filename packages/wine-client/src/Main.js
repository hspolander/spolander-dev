import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";

import Banner from "./components/banner/banner";
import AddReview from "./components/add/AddReview";
import ReviwResult from "./components/result/reviewResult";
import LoginOverlay from "./components/login/loginOverlay";
import Login from "./components/login/login";
import { setScreenSize } from "./components/global/actions";

import PrivateRoute from "./components/global/PrivateRoute";

import "./client.scss";
import reviewResult from "./components/result/reviewResult";

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
          <Switch>
            <PrivateRoute path="/reviews" component={reviewResult} />
            <PrivateRoute
              path="/reviews/:table?/:property?/:value?"
              component={ReviwResult}
            />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" component={AddReview} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
});

export default connect(mapStateToProps, null)(Client);

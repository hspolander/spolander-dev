import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import Banner from './components/banner/banner';
import AddWine from './components/add/addWine';
import AddReview from './components/add/addReview';
import WineResult from './components/result/wineResult';
import ReviwResult from './components/result/reviewResult';
import LoginOverlay from './components/login/loginOverlay';
import Login from './components/login/login';
import { setScreenSize } from './components/global/actions';

import PrivateRoute from './components/global/PrivateRoute';

import './client.scss';

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
      {Cookies.get('WINE_UUID') && <LoginOverlay />}
      <div className="main-content">
        <Switch>
          <PrivateRoute path="/addwine" component={AddWine} />
          <PrivateRoute path="/addreview" component={AddReview} />
          <PrivateRoute path="/wines" component={WineResult} />
          <PrivateRoute
            path="/reviews/:table?/:property?/:value?"
            component={ReviwResult}
            />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={AddWine} />
        </Switch>
      </div>
    </div>
  </Router>
);
}

const mapStateToProps = state => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
});

export default connect(
  mapStateToProps,
  null,
)(Client);

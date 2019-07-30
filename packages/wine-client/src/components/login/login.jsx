import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

import { loginUser, authUser } from './actions';
import LoginForm from './loginform';

import './login.scss';

const Login = ({ location, isAuthenticated }) => {
  useEffect(() => {
    authUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      
    }
  }, [isAuthenticated]);

  const handleSendLoginRequest = values => {
    loginUser(values);
  };

  const { from } = location.state || { from: { pathname: '/' } };
  if (Cookies.get('WINE_UUID')) {
    return <Redirect to={from.pathname} />;
  } else {
    return (
      <div className="login">
        <LoginForm handleSubmit={handleSendLoginRequest} />
      </div>
    );
  }
};
Login.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  fetching: state.loginReducer.fetching,
  fetched: state.loginReducer.fetched,
  error: state.loginReducer.error,
});

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(Login),
);

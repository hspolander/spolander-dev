import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser, authUser } from './actions';
import LoginForm from './loginform';

import './login.scss';

const LoginOverlay = ({ isAuthenticated }) => {
  const handleSendLoginRequest = values => {
    loginUser(values);
  };

  useEffect(() => {
    authUser();
  }, []);

  return (
    <div>
      {!isAuthenticated && <div className="loginOverlay" />}
      {!isAuthenticated && (
        <div className="login overlay">
          <div className="sessionExpired">
            {' '}
            Din session har tagit slut. Vänligen logga in igen för att
            fortsätta.
          </div>
          <LoginForm handleSubmit={handleSendLoginRequest} />
        </div>
      )}
    </div>
  );
};
LoginOverlay.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  redirectToReferrer: state.loginReducer.redirectToReferrer,
  isAuthenticated: state.loginReducer.isAuthenticated,
  fetching: state.loginReducer.fetching,
  fetched: state.loginReducer.fetched,
  error: state.loginReducer.error,
  redirectedToLogin: state.loginReducer.redirectedToLogin,
});

export default connect(
  mapStateToProps,
  null,
)(LoginOverlay);

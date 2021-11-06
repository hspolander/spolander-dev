import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { killSession } from "../login/actions";

import "./logout.scss";

const Logout = (props) => (
  <div className="banner-logout">
    <Link className="nostyle-link" onClick={() => props.killSession()} to="/">
      <div className="icons-menu">
        <FontAwesomeIcon icon={faSignOutAlt} size="3x" />
        <i className="icon-title">Logga ut</i>
      </div>
    </Link>
  </div>
);

const mapDispatchToProps = {
  killSession,
};

Logout.propTypes = {
  killSession: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Logout);

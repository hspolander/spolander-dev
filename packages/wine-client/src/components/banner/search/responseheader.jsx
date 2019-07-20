import React from 'react';
import PropTypes from 'prop-types';

import './search.scss';

const Responseheader = ({ responseheader }) => <p>{responseheader}</p>;
Responseheader.propTypes = {
  responseheader: PropTypes.string,
};

export default Responseheader;

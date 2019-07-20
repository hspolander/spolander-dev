import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

const Dropdown = ({ value, label }) => {

  return (
    <div>
      <div>
        <span>{label}</span>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default Dropdown;

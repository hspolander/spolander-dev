import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

const Select = ({ value, label }) => {

  return (
    <div>
      <div>
        <span>{label}</span>
      </div>
    </div>
  );
};

InputField.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default Select;

import React from 'react';

import PropTypes from 'prop-types';
import './autocompleteOptions.scss';

const AutocompleteOptions = ({ onClick, autocompleteOptions }) => (
  <div className="autocomplete-div">
    {autocompleteOptions &&
      autocompleteOptions.map((option, index) => (
        <button type="button" key={index} onClick={() => onClick(option)}>
          <span>{option}</span>
        </button>
      ))}
  </div>
);

AutocompleteOptions.propTypes = {
  onClick: PropTypes.func,
  autocompleteOptions: PropTypes.arrayOf(PropTypes.string),
};

export default AutocompleteOptions;

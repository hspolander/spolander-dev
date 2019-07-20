import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AutocompleteOptions from './autocompleteOptions';
import './inputField.scss';

const InputField = ({
  value,
  toUpperCase,
  placeholder,
  label,
  onChange,
  onEnterKeyPress,
  autocompleteOptions,
}) => {
  const [isFocused, setFocused] = useState(false);
  const onInputChange = e => {
    if (toUpperCase) {
      onChange(e.target.value.toUpperCase());
    } else {
      onChange(e.target.value);
    }
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onEnterKeyPress();
    }
  };

  return (
    <div className="input-div">
      <div>
        <span className="input-label noSelect">{label}</span>
      </div>
      <input
        onChange={e => onInputChange(e)}
        type="text"
        onKeyPress={e => onKeyPress(e)}
        placeholder={placeholder}
        value={value}
        onFocus={() => setFocused(true)}
      />
      {isFocused && autocompleteOptions && autocompleteOptions.length > 0 && (
        <AutocompleteOptions
          autocompleteOptions={autocompleteOptions}
          onClick={option => onChange(option)}
        />
      )}
    </div>
  );
};

InputField.propTypes = {
  toUpperCase: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onEnterKeyPress: PropTypes.func,
  autocompleteOptions: PropTypes.arrayOf(PropTypes.string),
};

export default InputField;

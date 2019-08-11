import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const InputRegular = props => {
  const { type, onChange, readOnly, onEnterPress, value, label, children, color, classes, variant, ...other } = props;

  const onKeyPress = (e) => {
    if (e.key === "Enter" && onEnterPress) {
      return onEnterPress();
    }
  };

  return (
    <TextField
      {...other}
      className={classes.root}
      onKeyPress={e => onKeyPress(e)}
      onChange={e => onChange(e.target.value)}
      classes={{
        contained: classes.contained,
        outlined: classes.outlined,
        text: classes.text,
        disabled: classes.disabled,
      }}
      variant={variant}
      color={color}
      type={type}
      value={value}
      label={label}
      InputProps={{
        readOnly: readOnly,
        classes: {
          root: classes.resize,
        },
      }}
      InputLabelProps={{
        shrink: true,
        classes: {
          root: classes.resize,
        },
      }}
    >
      {children}
    </TextField>
  );
};

InputRegular.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
};

export default InputRegular;

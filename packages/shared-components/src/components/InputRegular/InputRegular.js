import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";

const InputRegular = (props) => {
  const {
    type,
    multiline,
    multiRows,
    wide,
    onChange,
    readOnly,
    onEnterPress,
    required,
    value,
    label,
    children,
    color,
    classes,
    variant,
    ...other
  } = props;
  const [error, setError] = useState(false);
  const onKeyPress = (e) => {
    if (e.key === "Enter" && onEnterPress) {
      return onEnterPress();
    }
  };

  const onBlur = (e) => {
    if (required && !e.target.value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const onFocus = () => {
    setError(false);
  };

  return (
    <TextField
      {...other}
      className={wide ? clsx(classes.root, classes.wide) : classes.root}
      onKeyPress={(e) => onKeyPress(e)}
      onChange={(e) => onChange(e.target.value)}
      classes={{
        contained: classes.contained,
        outlined: classes.outlined,
        text: classes.text,
        disabled: classes.disabled,
      }}
      onFocus={() => onFocus()}
      required={required}
      onBlur={(e) => onBlur(e)}
      variant={variant}
      color={color}
      type={type}
      value={value}
      label={label}
      multiline={multiline}
      error={error}
      rows={multiline && multiRows}
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

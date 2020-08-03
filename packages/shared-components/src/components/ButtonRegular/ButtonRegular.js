import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const ButtonRegular = (props) => {
  const { onClick, children, color, classes, ...other } = props;
  return (
    <Button
      {...other}
      classes={{
        contained: classes.contained,
        outlined: classes.outlined,
        text: classes.text,
        disabled: classes.disabled,
      }}
      color={color}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

ButtonRegular.propTypes = {
  onClick: PropTypes.func,
  classes: PropTypes.object,
  color: PropTypes.string,
  children: PropTypes.node,
};

export default ButtonRegular;

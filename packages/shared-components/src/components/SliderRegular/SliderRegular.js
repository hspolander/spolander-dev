import React from "react";
import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const SliderRegular = (props) => {
  const {
    displayValue,
    classes,
    min,
    max,
    step,
    onChange,
    value,
    label,
  } = props;

  return (
    <FormControl className={classes.root}>
      <InputLabel className={classes.resize} shrink variant="outlined">
        {label}
      </InputLabel>
      <Slider
        aria-labelledby="slider"
        valueLabelDisplay={displayValue || "auto"}
        step={step}
        onChange={onChange}
        value={value}
        marks
        min={min}
        max={max}
      />
    </FormControl>
  );
};

SliderRegular.propTypes = {
  displayValue: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  step: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  label: PropTypes.string,
  classes: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

SliderRegular.defaultProps = {
  label: "",
  classes: {},
  displayValue: "",
};

export default SliderRegular;

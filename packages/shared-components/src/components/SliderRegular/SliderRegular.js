import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const SliderRegular = props => {
  const { displayValue, classes, min, max, step, onChange, value, label } = props;

  return (
    <FormControl className={classes.root}>
        <InputLabel className={classes.resize} shrink variant={'outlined'}>
            {label}
        </InputLabel>
          <Slider
              aria-labelledby="slider"
              valueLabelDisplay={displayValue || "auto"}
              step={step}
              onChange={onChange}
              value={typeof value === 'number' ? value : 0}
              marks
              min={min}
              max={max}
          />
    </FormControl>
  );
};

SliderRegular.propTypes = {
  children: PropTypes.node,
};

export default SliderRegular;

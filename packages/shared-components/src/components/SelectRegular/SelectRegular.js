import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const SelectRegular = (props) => {
  const { values, value, label, classes, onChange } = props;
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl className={classes.root}>
      <InputLabel
        shrink
        ref={inputLabel}
        className={clsx(classes.resize, classes.label)}
      >
        {label}
      </InputLabel>
      <Select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        notched
        input={
          <OutlinedInput labelWidth={labelWidth} className={classes.resize} />
        }
      >
        {values.map((val) => (
          <MenuItem key={val.value} value={val.value}>
            {val.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectRegular.propTypes = {
  values: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectRegular;

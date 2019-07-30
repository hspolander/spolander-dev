import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          className: clsx(classes.resize, classes.input),
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired,
};

const LoadingMessage = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.loadingMessage}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const NoOptionsMessage = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.noOptionsMessage}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

const Option = props => (
  <MenuItem
    ref={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400,
    }}
    {...props.innerProps}
  >
    {props.children}
  </MenuItem>
);

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
};

const Placeholder = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.placeholder}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

const SingleValue = props => (
  <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
    {props.children}
  </Typography>
);

const ValueContainer = props => (
  <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
);

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
};

const MultiValue = props => (
  <Chip
    tabIndex={-1}
    label={props.children}
    className={clsx(props.selectProps.classes.chip, {
      [props.selectProps.classes.chipFocused]: props.isfocused,
    })}
    onDelete={props.removeProps.onClick}
    deleteIcon={<CancelIcon {...props.removeProps} />}
  />
);

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool,
  removeProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};

const Menu = props => (
  <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
    {props.children}
  </Paper>
);

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object,
};

const components = {
  Control,
  Menu,
  MultiValue,
  Option,
  Placeholder,
  SingleValue,
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  ValueContainer,
  LoadingMessage,
  NoOptionsMessage,
};

const wideMultiStyle = makeStyles({
  root: isMulti => ({
    minWidth: isMulti ? '50vw' : '19vw',
  }),
});

const Autocomplete = props => {
  const { options, label, handleChange, isMulti, classes, required, variant } = props;

  const multiClasses = wideMultiStyle(isMulti);

  return (
    <div className={clsx(classes.root, multiClasses.root)}>
      <NoSsr>
        <AsyncCreatableSelect
          onChange={selected => handleChange(selected)}
          placeholder=""
          components={components}
          loadOptions={options}
          classes={classes}
          isMulti
          escapeClearsValue
          isClearable
          openMenuOnClick={false}
          noOptionsMessage={() => 'Skriv för att söka/lägga till'}
          loadingMessage={() => 'Laddar förslag...'}
          formatCreateLabel={val => `${val} (Ny)`}
          createOptionPosition="first"
          TextFieldProps={{
            label: label,
            variant: variant || 'outlined',
            required,
            InputLabelProps: {
              shrink: true,
              className: classes.resize,
            },
          }}
        />
      </NoSsr>
    </div>
  );
};

Autocomplete.propTypes = {
  onChange: PropTypes.func.isRequired,
  components: PropTypes.arrayOf(PropTypes.node).isRequired,
  styles: PropTypes.object.isRequired,
  loadOptions: PropTypes.array,
  classes: PropTypes.object.isRequired,
  isMulti: PropTypes.bool,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

Autocomplete.defaultProps = {
  loadOptions: null,
  isMulti: false,
};

export default Autocomplete;

import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";
const useStyles = makeStyles(styles);

const CustomSelect = ({
  labelText,
  id,
  labelProps,
  formControlProps,
  selectProps,
  error,
  success,
  children,
}) => {
  const classes = useStyles();

  const labelClasses = classNames({
    [" " + classes.labelRootError]: !!error,
    [" " + classes.labelRootSuccess]: success && !error,
  });

  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        classes={{
          root: marginTop,
          disabled: classes.disabled,
        }}
        labelId={id}
        id={id}
        {...selectProps}
      >
        {children}
      </Select>
      {error && (
        <FormHelperText error id="my-helper-text">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

CustomSelect.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  selectProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.string,
  success: PropTypes.bool,
};

export default CustomSelect;

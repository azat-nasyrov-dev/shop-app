import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const FormElement = ({required, name, label, value, onChange, error, type, autoComplete}) => {
  return (
    <Grid item xs>
      <TextField
        required={required}
        type={type}
        label={label}
        name={name}
        autoComplete={autoComplete}
        value={value}
        error={Boolean(error)}
        helperText={error}
        onChange={onChange}
      />
    </Grid>
  );
};

FormElement.propTypes = {
  required: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default FormElement;
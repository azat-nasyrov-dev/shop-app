import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const FormElement = ({error, select, options, ...props}) => {
  let inputChildren = null;

  if (select) {
    inputChildren = options.map(option => (
      <MenuItem key={option._id} value={option._id}>
        {option.title}
      </MenuItem>
    ));
  }

  return (
    <Grid item xs>
      <TextField
        select={select}
        error={Boolean(error)}
        helperText={error}
        {...props}
      >
        {inputChildren}
      </TextField>
    </Grid>
  );
};

FormElement.propTypes = {
  ...TextField.propTypes,
  error: PropTypes.string,
  select: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default FormElement;
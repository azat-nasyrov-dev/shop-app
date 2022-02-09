import React, {useRef, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  input: {
    display: 'none'
  }
});

const FileInput = ({onChange, name, label}) => {
  const classes = useStyles();
  const inputRef = useRef();

  const [filename, setFilename] = useState('');

  const activateInput = () => {
    inputRef.current.click();
  };

  const onFileChange = e => {
    if (e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  return (
    <>
      <input
        type="file"
        name={name}
        className={classes.input}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            variant="outlined"
            disabled
            fullWidth
            label={label}
            value={filename}
            onClick={activateInput}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={activateInput}
          >
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
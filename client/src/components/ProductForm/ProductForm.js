import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FileInput from '../UI/Form/FileInput';
import MenuItem from '@material-ui/core/MenuItem';

const ProductForm = ({onSubmit, categories}) => {
  const [state, setState] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  const submitFormHandler = e => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(state).forEach(key => {
      formData.append(key, state[key]);
    });

    onSubmit(formData);
  };

  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setState(prevState => ({
      ...prevState,
      [name]: file
    }));
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            required
            fullWidth
            select
            variant="outlined"
            label="Category"
            name="category"
            value={state.category}
            onChange={inputChangeHandler}
          >
            <MenuItem><i>Select a category</i></MenuItem>
            {categories.map(category => (
              <MenuItem
                key={category._id}
                value={category._id}
              >
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            required
            fullWidth
            variant="outlined"
            id="title"
            label="Title"
            name="title"
            value={state.title}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            fullWidth
            variant="outlined"
            type="number"
            id="price"
            label="Price"
            name="price"
            value={state.price}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            id="description"
            label="Description"
            name="description"
            value={state.description}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            name="image"
            label="Image"
            onChange={fileChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
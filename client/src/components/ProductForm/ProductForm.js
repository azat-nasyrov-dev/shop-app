import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FileInput from '../UI/Form/FileInput';
import FormElement from '../UI/Form/FormElement';

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
        <FormElement
          required
          select
          label="Category"
          name="category"
          value={state.category}
          onChange={inputChangeHandler}
          options={categories}
        />
        <FormElement
          required
          label="Title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
        />
        <FormElement
          required
          type="number"
          label="Price"
          name="price"
          value={state.price}
          onChange={inputChangeHandler}
        />
        <FormElement
          required
          multiline
          rows={3}
          label="Description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
        />

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
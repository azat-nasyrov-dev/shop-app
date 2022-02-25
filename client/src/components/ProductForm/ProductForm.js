import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import FileInput from '../UI/Form/FileInput';
import FormElement from '../UI/Form/FormElement';
import ButtonWithProgress from '../UI/ButtonWithProgress/ButtonWithProgress';

const ProductForm = ({onSubmit, categories, loading, error}) => {
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

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <form onSubmit={submitFormHandler} noValidate>
      <Grid container direction="column" spacing={2}>
        <FormElement
          required
          select
          label="Category"
          name="category"
          value={state.category}
          onChange={inputChangeHandler}
          options={categories}
          error={getFieldError('category')}
        />

        <FormElement
          required
          label="Title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          error={getFieldError('title')}
        />

        <FormElement
          required
          type="number"
          label="Price"
          name="price"
          value={state.price}
          onChange={inputChangeHandler}
          error={getFieldError('price')}
        />

        <FormElement
          multiline
          rows={3}
          label="Description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
          error={getFieldError('description')}
        />

        <Grid item xs>
          <FileInput
            name="image"
            label="Image"
            onChange={fileChangeHandler}
            error={getFieldError('image')}
          />
        </Grid>

        <Grid item xs>
          <ButtonWithProgress
            type="submit"
            color="primary"
            variant="contained"
            loading={loading}
            disabled={loading}
          >
            Create
          </ButtonWithProgress>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
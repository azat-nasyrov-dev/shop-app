import {createAsyncThunk} from '@reduxjs/toolkit';
import history from '../../history';

export const historyPush = createAsyncThunk('history/push',
  (path) => {
    history.push(path);
  });

export const historyReplace = createAsyncThunk('history/replace',
  path => {
    history.replace(path);
  });
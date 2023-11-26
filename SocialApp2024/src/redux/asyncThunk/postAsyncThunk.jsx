import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constant';
import {addPostService, getPostService} from '../services/post_services';

export const getPostThunk = createAsyncThunk(
  ASYNC_ROUTES.GET_POSTS,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await getPostService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const addPostAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.ADD_POSTS,
  async (payload, {rejectWithValue}) => {
    console.log(payload, '...payload from signUp');
    try {
      const response = await addPostService(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error); // Call rejectWithValue with the error
    }
  },
);

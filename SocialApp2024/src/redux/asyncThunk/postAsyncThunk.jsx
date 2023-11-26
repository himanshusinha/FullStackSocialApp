import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constant';
import {getPostService} from '../services/post_services';

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

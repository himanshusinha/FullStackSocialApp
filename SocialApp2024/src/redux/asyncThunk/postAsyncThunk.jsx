import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  addPostService,
  deletePostByIdService,
  getPostByIdService,
  getPostService,
  likePostByIdService,
  updatePostByIdService,
} from '../services/post_services';
import {ASYNC_ROUTES} from '../constants/redux.constant';

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
export const deletePostByIdAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.DELETE_POST_BY_ID,
  async ({id}, {rejectWithValue}) => {
    try {
      const response = await deletePostByIdService({id});
      console.log(response, '.......response from delete admin service');
      return response;
    } catch (err) {
      console.error('Error deleting post:', err);
      return rejectWithValue(err);
    }
  },
);

export const getPostByIdAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.GET_POSTS_BY_ID,
  async ({id}, {rejectWithValue}) => {
    try {
      const response = await getPostByIdService({id});
      console.log(
        response,
        '.......response from get post by id profile thunk',
      );
      return response;
    } catch (err) {
      console.error('Error deleting post:', err);
      return rejectWithValue(err);
    }
  },
);
export const updatePostByIdThunk = createAsyncThunk(
  ASYNC_ROUTES.UPDATE_POST_BY_ID,
  async ({id, caption}, {rejectWithValue}) => {
    try {
      const response = await updatePostByIdService({
        id,
        caption,
      });
      console.log(response, '.......response from update admin service');
      return response;
    } catch (err) {
      console.error(err, 'Error updating post');
      return rejectWithValue(err);
    }
  },
);

export const likePostByIdThunk = createAsyncThunk(
  ASYNC_ROUTES.LIKE_POST_BY_ID,
  async ({id}, {rejectWithValue}) => {
    try {
      const response = await likePostByIdService({
        id,
      });
      console.log(response, '.......response from liked post thunk');
      return response;
    } catch (err) {
      console.error(err, 'Error updating post');
      return rejectWithValue(err);
    }
  },
);

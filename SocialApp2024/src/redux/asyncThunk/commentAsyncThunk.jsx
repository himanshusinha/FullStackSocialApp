// commentAsyncThunk.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constant';
import {
  commentPostService,
  deleteCommentByIdService,
  followUserByIdService,
  getCommentService,
  getCommentServiceById,
  updateCommentByIdService,
} from '../services/comment_services';
import {replaceUrl} from '../constants/services.constant';

export const commentAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.ADD_COMMENTS,
  async ({userId, postId, comment, username}, {rejectWithValue}) => {
    try {
      const response = await commentPostService({
        userId: userId,
        postId: postId,
        comment: comment,
        username: username,
      });

      // Assuming the actual structure is different, adjust accordingly
      if (response && response.status === true) {
        // Handle success, if needed
        return response;
      } else {
        console.error('Unexpected response structure:', response);
        return rejectWithValue('Unexpected response structure');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      return rejectWithValue(err.message || 'Error adding comment');
    }
  },
);
export const getCommentIdThunk = createAsyncThunk(
  ASYNC_ROUTES.GET_COMMENT_BY_ID,
  async ({id}, {rejectWithValue}) => {
    try {
      const response = await getCommentServiceById({id});
      console.log(
        response,
        '...response from update order details by id asyncthunk',
      );
      return response.data; // Assuming the response contains data field
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const getCommentsThunk = createAsyncThunk(
  ASYNC_ROUTES.GET_COMMENT,
  async (payload, {rejectWithValue}) => {
    try {
      const response = await getCommentService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export const deleteComnentByIdAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.DELETE_COMMENT_BY_ID,
  async ({id}, {rejectWithValue}) => {
    try {
      const response = await deleteCommentByIdService({id});
      console.log(response, '.......response from delete comment by id thunk');
      return response;
    } catch (err) {
      console.error('Error deleting post:', err);
      return rejectWithValue(err);
    }
  },
);

export const updateCommentByIdThunk = createAsyncThunk(
  ASYNC_ROUTES.UPDATE_COMMENT_BY_ID,
  async ({id, comment}, {rejectWithValue}) => {
    try {
      const response = await updateCommentByIdService({
        id,
        comment,
      });

      if (response && response.status === true) {
        return response.data; // Assuming the response contains data field
      } else {
        console.error('Unexpected response structure:', response);
        return rejectWithValue('Unexpected response structure');
      }
    } catch (err) {
      console.error('Error updating comment:', err);
      return rejectWithValue(err.message || 'Error updating comment');
    }
  },
);

export const followUserByIdAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.FOLLOW_USER_BY_ID,
  async ({id}, {rejectWithValue}) => {
    try {
      const response = await followUserByIdService({id});
      return response;
    } catch (err) {
      console.error('Error following user:', err);
      return rejectWithValue(err);
    }
  },
);

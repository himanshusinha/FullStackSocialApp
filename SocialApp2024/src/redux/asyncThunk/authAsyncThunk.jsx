import {createAsyncThunk} from '@reduxjs/toolkit';
import {ASYNC_ROUTES} from '../constants/redux.constant';
import {
  getUserProfileByIdServices,
  loginService,
  signUpService,
} from '../services/auth_services';

export const loginAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.LOGIN,
  async (payload, {rejectWithValue}) => {
    console.log(payload, '...payload from login');

    try {
      const response = await loginService(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const signUpAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.SIGN_UP,
  async (payload, {rejectWithValue}) => {
    console.log(payload, '...payload from signUp');
    try {
      const response = await signUpService(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getUserProfileByIdThunk = createAsyncThunk(
  ASYNC_ROUTES.GET_PROFILE_BY_ID,
  async ({id}, {rejectWithValue}) => {
    try {
      const response = await getUserProfileByIdServices({id});
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

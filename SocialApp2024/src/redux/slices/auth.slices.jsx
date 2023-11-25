import {createSlice} from '@reduxjs/toolkit';
import {THUNK_STATUS} from '../constants/redux.constant';
import {loginAsyncThunk} from '../asyncThunk/authAsyncThunk';

const initialState = {
  user: null,
  accessToken: null,
  authStatus: null,
  isLoading: false,
  isAuthenticated: false,
  isError: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAsyncThunk.pending, state => {
      state.authStatus = THUNK_STATUS.LOADING;
      state.isLoading = true;
      state.isAuthenticated = false;
      state.isError = false;
      state.accessToken = null;
    });

    builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
      const {user, accessToken} = action?.payload?.data;
      state.authStatus = THUNK_STATUS.SUCCESS;
      state.user = user;
      state.accessToken = accessToken;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isError = false;
    });

    builder.addCase(loginAsyncThunk.rejected, state => {
      state.authStatus = THUNK_STATUS.FAILED;
      state.isLoading = false;
      state.isError = true;
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export const {logout} = authSlice.actions;
export const authState = state => state.authStatus;
export default authSlice.reducer;

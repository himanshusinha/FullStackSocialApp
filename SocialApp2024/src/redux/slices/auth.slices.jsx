import {createSlice} from '@reduxjs/toolkit';
import {THUNK_STATUS} from '../constants/redux.constant';
import {loginAsyncThunk} from '../asyncThunk/authAsyncThunk';

const initialState = {
  user: [],
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
      state.user = null; // Clear user information on logout
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAsyncThunk.pending, (state, action) => {
      console.log(state);
      state.authStatus = THUNK_STATUS.LOADING;
      state.isLoading = true;
      state.isAuthenticated = false;
      state.isError = false;
      state.accessToken = null; // Clear user information when loading
    });

    builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
      console.log(action.payload, '.........fullfilled');
      state.authStatus = THUNK_STATUS.SUCCESS;
      state.user = action?.payload?.data;
      state.accessToken = action.payload?.data?.access_token;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isError = false;
    });

    builder.addCase(loginAsyncThunk.rejected, (state, action) => {
      console.log(state, '......rejected');
      state.authStatus = THUNK_STATUS.FAILED;
      state.isLoading = false;
      state.isError = true;
      state.isAuthenticated = false;
      state.user = null; // Clear user information on rejection
    });
  },
});

export const {addToken, logout} = authSlice.actions;
export const authState = state => state.authStatus;
export default authSlice.reducer;

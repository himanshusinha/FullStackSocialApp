import {combineReducers} from '@reduxjs/toolkit';
import authSlices from './auth.slices';

export default combineReducers({
  auth: authSlices,
});

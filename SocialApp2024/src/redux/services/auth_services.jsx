// auth_services.js
import Axios from 'axios';
import {METHODS, SERVICE_ROUTES} from '../constants/services.constant';

export const loginService = async data => {
  try {
    const config = {
      url: 'http://192.168.1.38:8200/socialapp/api/auth/login',
      method: METHODS.POST,
      data,
    };
    const response = await Axios.request(config);
    console.log(response.data, '...response from login service');
    return response.data; // Return only the relevant data
  } catch (error) {
    console.error(
      'Error in loginService:',
      error.response?.data || error.message,
    );
    throw error; // Rethrow the error to be caught by the async thunk
  }
};

export const signUpService = async data => {
  try {
    const config = {
      url: 'http://192.168.1.38:8200/socialapp/api/auth/register',
      method: METHODS.POST,
      headers: {'Content-Type': 'application/json'},
      data,
    };
    const response = await Axios.request(config);
    console.log(response.data, '...response from signUp service');
    return response.data; // Return only the relevant data
  } catch (error) {
    console.error(
      'Error in signUpService:',
      error.response?.data || error.message,
    );
    throw error; // Rethrow the error to be caught by the async thunk
  }
};

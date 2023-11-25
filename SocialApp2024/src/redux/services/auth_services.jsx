// auth_services.js
import Axios from 'axios';
import {
  METHODS,
  SERVICE_ROUTES,
  replaceUrl,
} from '../constants/services.constant';
import {ASYNC_ROUTES} from '../constants/redux.constant';

//loginService
export const loginService = async data => {
  try {
    const config = {
      url: 'http://192.168.1.38:8200/socialapp/api/auth/login',
      method: METHODS.POST,
      data,
    };
    const response = await Axios.request(config);
    console.log(response.data, '...response from login service');
    return response.data;
  } catch (error) {
    console.error(
      'Error in loginService:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

//signUpService
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
    return response.data;
  } catch (error) {
    console.error(
      'Error in signUpService:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// getUserProfileById
export const getUserProfileByIdServices = ({id}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_PROFILE_BY_ID, {id}),
      method: METHODS.GET,
    };
    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from get profile service');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

import Axios from 'axios';
import {METHODS, SERVICE_ROUTES} from '../constants/services.constant';

export const getPostService = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_POSTS,
      method: METHODS.GET,
    };
    console.log(config, '.......config');

    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from categories');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

import Axios from 'axios';
import {
  METHODS,
  SERVICE_ROUTES,
  replaceUrl,
} from '../constants/services.constant';

export const getPostService = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_POSTS,
      method: METHODS.GET,
    };
    console.log(config, '.......config');

    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from get all posts ');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const addPostService = data => {
  console.log('FormData:', data);
  let config = {
    url: SERVICE_ROUTES.ADD_POSTS,
    method: METHODS.POST,
    headers: {'Content-Type': 'multipart/form-data'},
    data,
  };
  console.log(config, '.......config of add post');

  return Axios.request(config)
    .then(res => {
      console.log(res, '.......response from signup services');
      return res.data;
    })
    .catch(err => {
      throw err;
    });
};
export const deletePostByIdService = ({id}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.DELETE_POSTS_BY_ID, {id}),
      method: METHODS.DELETE,
      id,
    };
    console.log('DELETE Request:', config.url, config.method);
    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from delete service');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getPostByIdService = ({id}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_POSTS_BY_ID, {id}),
      method: METHODS.GET,
      id,
    };
    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from get post by id profile service');

        // Assuming the server response structure contains an 'error' field for errors
        if (res.data.error) {
          reject({error: res.data.error});
        } else {
          resolve(res.data); // Assuming your actual post data is in 'data' field
        }
      })
      .catch(err => {
        console.error(err, '.......error from get post by id profile service');
        reject({error: err.message || 'Something went wrong'});
      });
  });
};

// editPostByIdService
export const updatePostByIdService = ({id, caption}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.UPDATE_POSTS_BY_ID, {id}), // Make sure 'id' is defined
      method: METHODS.PUT,
      data: {id, caption},
    };
    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from update service');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const likePostByIdService = ({id}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.LIKE_POST_BY_ID, {id}), // Make sure 'id' is defined
      method: METHODS.PUT,
      data: {id},
    };
    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from update service');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

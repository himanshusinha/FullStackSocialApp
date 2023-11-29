import Axios from 'axios';
import {
  METHODS,
  SERVICE_ROUTES,
  replaceUrl,
} from '../constants/services.constant';

export const commentPostService = async ({
  userId,
  postId,
  comment,
  username,
}) => {
  try {
    const response = await Axios({
      method: METHODS.POST,
      url: SERVICE_ROUTES.ADD_COMMENTS,
      data: {userId, postId, comment, username},
    });

    return response.data;
  } catch (error) {
    console.error('Error from comment service:', error);
    throw error; // Re-throw the error to propagate it
  }
};
// getCommentServiceById
export const getCommentServiceById = ({id}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_COMMENT_BY_ID, {id}),
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
// getCommentService
// deleteCommentByIdService

export const getCommentService = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_COMMENT,
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
export const deletePostByIdService = ({id}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.DELETE_COMMENT_BY_ID, {id}),
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

export const deleteCommentByIdService = ({id}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.DELETE_COMMENT_BY_ID, {id}), // Make sure 'id' is defined
      method: METHODS.DELETE,
      data: {id},
    };
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
export const updateCommentByIdService = ({id, comment}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.UPDATE_COMMENT_BY_ID, {id}),
      method: METHODS.PUT,
      data: {comment}, // Pass only the comment data, not the id
    };
    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from update comment by id service');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const followUserByIdService = ({id}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.FOLLOW_USER_BY_ID, {id}),
      method: METHODS.PUT,
      data: {id},
    };
    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from follow user service');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

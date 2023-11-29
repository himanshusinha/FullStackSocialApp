export const SERVICE_ROUTES = {
  LOGIN: '/api/v1/user/login',
  LOG_OUT: '/api/v1/user/logout',
  SIGN_UP: '/api/v1/user/signup',
  GET_PROFILE_BY_ID: '/api/users/getUser/:id',
  GET_POSTS: '/api/post/getpost',
  GET_POSTS_BY_ID: '/api/post/getpost/:id',
  ADD_POSTS: '/api/post/addpost',
  ADD_COMMENTS: '/api/post/comment/addcomment',
  DELETE_POSTS_BY_ID: '/api/post/deletepost/:id',
  UPDATE_POSTS_BY_ID: '/api/post/updatepost/:id',
  LIKE_POST_BY_ID: '/api/post/like/:id',
  GET_COMMENT: '/api/post/comment/getcomments',
  GET_COMMENT_BY_ID: '/api/post/comment/getcomment/:id',
  DELETE_COMMENT_BY_ID: '/api/post/comment/deletecomment/:id',
  UPDATE_COMMENT_BY_ID: '/api/post/comment/updatecomments/:id',
  FOLLOW_USER_BY_ID: '/api/users/follow/:id',
};
export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH',
};
export const replaceUrl = (url, data) => {
  var regex = new RegExp(':(' + Object.keys(data).join('|') + ')', 'g');
  return url?.replace(regex, (m, $1) => data[$1] || m);
};

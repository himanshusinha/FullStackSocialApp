export const SERVICE_ROUTES = {
  LOGIN: '/api/v1/user/login',
  LOG_OUT: '/api/v1/user/logout',
  SIGN_UP: '/api/v1/user/signup',
  GET_PROFILE_BY_ID: 'http://192.168.1.38:8200/socialapp/api/users/getUser/:id',
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

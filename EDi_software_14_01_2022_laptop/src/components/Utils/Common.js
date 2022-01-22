// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}
export const getUserId = () => {
  const userStrId = sessionStorage.getItem('userId');
  if (userStrId) return JSON.parse(userStrId);
  else return null;
}

export const getDate = () => {
  const dateStr = sessionStorage.getItem('currentdate');
  if (dateStr) return JSON.parse(dateStr);
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('currentdate');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  console.log("Athenticate call token "+JSON.stringify(token));
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}
export const setloginSession = (userId, currentdate) => {
  sessionStorage.setItem('userId', JSON.stringify(userId));
  sessionStorage.setItem('currentdate', JSON.stringify(currentdate));
}

 

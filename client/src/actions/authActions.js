import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      history.push('/login');
      dispatch({
        type: CLEAR_ERRORS,
        payload: {}
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to LS
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from LS
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}

// Check if token is still valid. If not logout user
// export const getUserFromLocalStorage = () => dispatch => {
//   if (localStorage.jwtToken) {
//     // Set auth token header auth
//     setAuthToken(localStorage.jwtToken);
//     // Decode token and get user info and exp
//     const decoded = jwt_decode(localStorage.jwtToken);
//     // Set user and isAuthenticated
//     dispatch(setCurrentUser(decoded));
//     // Check for expired token
//     const currentTime = Date.now() / 1000;
//     if (decoded.exp < currentTime) {
//       dispatch(logoutUser());
//       // Clear current Profile
//       dispatch(clearCurrentProfile());
//     }
//   }
// };
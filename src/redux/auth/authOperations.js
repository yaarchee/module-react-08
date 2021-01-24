import axios from 'axios';
import {
  loginRequest,
  loginSuccess,
  loginError,
  registerRequest,
  registerSuccess,
  registerError,
  logOutRequest,
  logOutSuccess,
  logOutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} from './authActions';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const logIn = (data) => async (dispatch) => {
  dispatch(loginRequest());
  console.log('logIn');
  console.log(data);
  console.log(JSON.stringify(data));

  try {
    const response = await axios.post('/users/login', data);
    token.set(response.data.token);
    dispatch(loginSuccess(response.data));
  } catch (e) {
    dispatch(loginError(e.message));
  }
};

const register = (data) => async (dispatch) => {
  console.log('register');
  console.log(data);
  dispatch(registerRequest());

  try {
    const response = await axios.post('/users/signup', data);
    token.set(response.data.token);
    console.log(response.data.token);
    console.log(response.data);
    dispatch(registerSuccess(response.data));
  } catch (e) {
    dispatch(registerError(e.message));
  }
};

const logOut = (data) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post('/users/logout');
    token.unset();
    dispatch(logOutSuccess());
  } catch (e) {
    dispatch(logOutSuccess(e.message));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: prestistedToken },
  } = getState();

  if (!prestistedToken) {
    return;
  }

  token.set(prestistedToken);
  dispatch(getCurrentUserRequest());

  try {
    const response = await axios.get('/users/current');
    console.log(response.data);
    dispatch(getCurrentUserSuccess(response.data));
  } catch (e) {
    dispatch(getCurrentUserError(e.message));
  }
};

export default {
  logIn,
  register,
  logOut,
  getCurrentUser,
};

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// import {
//   loginRequest,
//   loginSuccess,
//   loginError,
//   registerRequest,
//   registerSuccess,
//   registerError,
//   logOutRequest,
//   logOutSuccess,
//   logOutError,
//   getCurrentUserRequest,
//   getCurrentUserSuccess,
//   getCurrentUserError,
// } from './authActions';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const token = {
  set(tokenID) {
    axios.defaults.headers.common.Authorization = `Bearer ${tokenID}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const logIn = createAsyncThunk(
  'auth/login',
  async (requestLoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/login', requestLoginData);
      token.set(response.data.token);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const register = createAsyncThunk(
  'auth/register',
  async (requestDataRegister, { rejectedWithValue }) => {
    try {
      const response = await axios.post('/users/signup', requestDataRegister);
      token.set(response.data.token);

      return response.data;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectedWithValue }) => {
    try {
      await axios.post('/users/logout');
      token.unset();
      // dispatch(logOutSuccess());
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    const {
      auth: { token: prestistedToken },
    } = thunkAPI.getState();

    console.log('auth/getCurrentUser ' + prestistedToken);
    if (!prestistedToken) {
      return thunkAPI.rejectWithValue();
    }
    token.set(prestistedToken);

    try {
      const response = await axios.get('/users/current');
      console.log(response);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// const getCurrentUser = () => async (dispatch, getState) => {
//   const {
//     auth: { token: prestistedToken },
//   } = getState();
//
//   if (!prestistedToken) {
//     return;
//   }
//
//   token.set(prestistedToken);
//   dispatch(getCurrentUserRequest());
//
//   try {
//     const response = await axios.get('/users/current');
//     console.log(response.data);
//     dispatch(getCurrentUserSuccess(response.data));
//   } catch (e) {
//     dispatch(getCurrentUserError(e.message));
//   }
// };

// const logIn = (data) => async (dispatch) => {
//   dispatch(loginRequest());
//   console.log('logIn');
//   console.log(data);
//   console.log(JSON.stringify(data));
//
//   try {
//     const response = await axios.post('/users/login', data);
//     token.set(response.data.token);
//     dispatch(loginSuccess(response.data));
//   } catch (e) {
//     dispatch(loginError(e.message));
//   }
// };

// const logOut = (data) => async (dispatch) => {
//   dispatch(loginRequest());
//
//   try {
//     const response = await axios.post('/users/logout');
//     token.unset();
//     dispatch(logOutSuccess());
//   } catch (e) {
//     dispatch(logOutSuccess(e.message));
//   }
// };

// const register = (data) => async (dispatch) => {
//   console.log('register');
//   console.log(data);
//   dispatch(registerRequest());
//
//   try {
//     const response = await axios.post('/users/signup', data);
//     token.set(response.data.token);
//     console.log(response.data.token);
//     console.log(response.data);
//     dispatch(registerSuccess(response.data));
//   } catch (e) {
//     dispatch(registerError(e.message));
//   }
// };

export default {
  logIn,
  register,
  logOut,
  getCurrentUser,
};

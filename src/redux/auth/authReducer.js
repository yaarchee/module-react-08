import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
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

const initialSate = {
  name: null,
  mail: null,
};

const user = createReducer(initialSate, {
  [loginSuccess]: (_, action) => action.payload.user,
  [registerSuccess]: (_, action) => action.payload.user,
  [logOutSuccess]: () => initialSate,
  [getCurrentUserSuccess]: (_, action) => action.payload,
});

const token = createReducer(null, {
  [loginSuccess]: (_, action) => action.payload.token,
  [registerSuccess]: (_, action) => action.payload.token,
  [logOutSuccess]: () => null,
});

const isAuth = createReducer(false, {
  [loginSuccess]: () => true,
  [registerSuccess]: () => true,
  [getCurrentUserSuccess]: () => true,
  [logOutSuccess]: () => false,
  [registerError]: () => false,
  [getCurrentUserError]: () => false,
});

const authReducer = combineReducers({
  user,
  token,
  isAuth,
});

export default authReducer;

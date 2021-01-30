// import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import authOperations from './authOperations';
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

const initialState = {
  user: { name: null, mail: null },
  token: null,
  isAuth: false,
  isRefreshing: false,
};

function setData(state, action) {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isAuth = true;
}

function unSetData(state) {
  state.user = initialState.user;
  state.token = initialState.token;
  state.isAuth = initialState.isAuth;
}

function refreshUser(state, action) {
  console.log(action.payload);
  state.user = action.payload;
  state.isAuth = true;
  state.isRefreshing = false;
  console.log(' after refreshUser' + state.user);
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [authOperations.logIn.fulfilled](state, action) {
      // state.user = action.payload.user;
      // state.token = action.payload.token;
      // state.isAuth = true
      setData(state, action);
    },
    [authOperations.register.fulfilled](state, action) {
      // state.user = action.payload.user;
      // state.token = action.payload.token;
      // state.isAuth = true
      setData(state, action);
    },
    [authOperations.logOut.fulfilled](state, _) {
      unSetData(state);
    },

    [authOperations.getCurrentUser.fulfilled](state, action) {
      refreshUser(state, action);
    },
    [authOperations.getCurrentUser.pending](state) {
      state.isRefreshing = true;
    },
    [authOperations.getCurrentUser.rejected](state) {
      state.isRefreshing = false;
    },
  },
});

// const user = createReducer(initialState, {
//   [loginSuccess]: (_, action) => action.payload.user,
//   [registerSuccess]: (_, action) => action.payload.user,
//   [logOutSuccess]: () => initialState,
//   [getCurrentUserSuccess]: (_, action) => action.payload,
// });
//
// const token = createReducer(null, {
//   [loginSuccess]: (_, action) => action.payload.token,
//   [registerSuccess]: (_, action) => action.payload.token,
//   [logOutSuccess]: () => null,
// });
//
// const isAuth = createReducer(false, {
//   [loginSuccess]: () => true,
//   [registerSuccess]: () => true,
//   [getCurrentUserSuccess]: () => true,
//   [logOutSuccess]: () => false,
//   [registerError]: () => false,
//   [getCurrentUserError]: () => false,
// });

// const authReducer = combineReducers({
//   user,
//   token,
//   isAuth,
// });

export default userSlice.reducer;

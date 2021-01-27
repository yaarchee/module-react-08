// import { combineReducers } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import counterReducer from './counter/counterReducer';
import phoneBookSlice from './phoneBook/phoneBookSlice';
import authReducer from './auth/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const middleware = [...getDefaultMiddleware(), logger];

const authPersistConfig = {
  key: 'authToken',
  storage,
  whitelist: ['token'],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    phoneBook: phoneBookSlice,
  },
  // eslint-disable-next-line no-process-env
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

const persistor = persistStore(store);
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

export { store, persistor };

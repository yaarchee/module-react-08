import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from '../phoneBook/phoneBookActions';
import operations from './phoneBookOperations';
// import {
//   addContactSuccess,
//   deleteContactSuccess,
//   fetchContactsSuccess,
// } from './phoneBookActions';

const { getAllContacts, addContact, deleteContact } = operations;

const contact = createReducer([], {
  [getAllContacts.fulfilled]: (_, action) => action.payload,
  // [addContactSuccess]: (state, action) => [action.payload, ...state],
  [addContact.fulfilled]: (state, action) => [action.payload, ...state],
  [deleteContact.fulfilled]: (state, action) =>
    state.filter((contact) => contact.id !== action.payload),
});

const filter = createReducer('', {
  [actions.findContact]: (_, action) => action.payload,
});

const phoneBookReducer = combineReducers({
  contact,
  filter,
});

export default phoneBookReducer;

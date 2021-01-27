import { combineReducers } from 'redux';
import { createReducer, createSlice } from '@reduxjs/toolkit';
import actions from '../phoneBook/phoneBookActions';
import operations from './phoneBookOperations';
// import {
//   addContactSuccess,
//   deleteContactSuccess,
//   fetchContactsSuccess,
// } from './phoneBookActions';

const { getAllContacts, addContact, deleteContact } = operations;

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },
  extraReducers: {
    [getAllContacts.fulfilled](state, action) {
      state.contacts = action.payload;
    },
    [addContact.fulfilled](state, action) {
      state.contacts = [action.payload, ...state.contacts];
    },
    [deleteContact.fulfilled](state, action) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

const filter = createReducer('', {
  [actions.findContact]: (_, action) => action.payload,
});

//
// const contact = createReducer([], {
//   [getAllContacts.fulfilled]: (_, action) => action.payload,
//   // [addContactSuccess]: (state, action) => [action.payload, ...state],
//   [addContact.fulfilled]: (state, action) => [action.payload, ...state],
//   [deleteContact.fulfilled]: (state, action) =>
//       state.filter((contact) => contact.id !== action.payload),
// });

const phoneBookSlice = combineReducers({
  contact: contactsSlice.reducer,
  filter,
});

export default phoneBookSlice;

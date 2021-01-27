import axios from 'axios';
// import {
//   addContactSuccess,
//   addContactRequest,
//   fetchContactsSuccess,
//   fetchContactsRequest,
//   fetchContactsError,
//   addContactError,
//   deleteContactRequest,
//   deleteContactSuccess,
//   deleteContactError,
// } from './phoneBookActions';
import { createAsyncThunk } from '@reduxjs/toolkit';

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${id}`);
      console.log(id);
      return id;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const newContact = await axios
        .post('/contacts', contact)
        .then(({ data }) => data);
      console.log(newContact);
      return newContact;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const getAllContacts = createAsyncThunk(
  'contacts/getAllContacts',
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get('/contacts').then(({ data }) => data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// export const fetchBooks = createAsyncThunk(
//     'books/fetchBooks',
//     async (_, { rejectWithValue }) => {
//       try {
//         const books = await bookShelfAPI.fetchBooks();
//         return books;
//       } catch (error) {
//         return rejectWithValue(error);
//       }
//     },
// );

// const addContact = (name, number) => async (dispatch) => {
//   dispatch(addContactRequest());
//   try {
//     const contact = {
//       name,
//       number,
//     };
//
//     await axios.post('/contacts', contact).then(({ data }) => {
//       dispatch(addContactSuccess(data));
//     });
//   } catch (e) {
//     dispatch(addContactError(e));
//   }
// };

// const deleteContact = (id) => async (dispatch) => {
//   dispatch(deleteContactRequest());
//   await axios
//     .delete(`/contacts/${id}`)
//     .then(dispatch(deleteContactSuccess(id)))
//     .catch((e) => dispatch(deleteContactError(e)));
// };

// const getAllContacts = () => async (dispatch) => {
//   dispatch(fetchContactsRequest());
//   try {
//     await axios
//       .get('/contacts')
//       .then(({ data }) => dispatch(fetchContactsSuccess(data)));
//   } catch (e) {
//     dispatch(fetchContactsError(e));
//   }
// };

export default { addContact, deleteContact, getAllContacts };

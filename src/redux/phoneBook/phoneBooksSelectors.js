import { createSelector } from 'reselect';

export const getContacts = ({ phoneBook: { contact } }) => contact;
export const getFilterQuery = ({ phoneBook: { filter } }) => filter;

export const getFilteredContacts = createSelector(
  [getContacts, getFilterQuery],
  (contacts, filterQuery) => {
    console.log(contacts);
    console.log(filterQuery);

    return contacts.filter((item) =>
      item.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }
);

import React, { useEffect } from 'react';
import ListItem from './ListItem/ListItem';
import styles from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts } from '../../../redux/phoneBook/phoneBooksSelectors';

import operation from '../../../redux/phoneBook/phoneBookOperations';

function ContactList() {
  const dispatch = useDispatch();
  const contact = useSelector(getFilteredContacts);

  const removeContact = (id) => {
    console.log(id);
    dispatch(operation.deleteContact(id));
  };

  return (
    <ul className={styles.contactList}>
      {contact.map(({ id, name, number }) => (
        <ListItem
          key={id}
          name={name}
          phone={number}
          onRemove={() => removeContact(id)}
        />
      ))}
    </ul>
  );
}

export default ContactList;

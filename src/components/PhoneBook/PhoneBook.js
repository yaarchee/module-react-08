import React, { useEffect } from 'react';
import CreateContactsForm from './CreateContactsForm/CreateContactsForm';
import ContactList from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './Filter/Filter';
import Section from './Section/Section';
import styles from './PhoneBook.module.css';
import operation from '../../redux/phoneBook/phoneBookOperations';
import { getContacts } from '../../redux/phoneBook/phoneBooksSelectors';

function PhoneBook() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  console.log(contacts);

  useEffect(() => {
    dispatch(operation.getAllContacts());
  }, []);
  return (
    <>
      <div className={styles.wrapSections}>
        <h2>Hooks</h2>
        <Section>
          <h2>Phonebook</h2>
          <CreateContactsForm />
        </Section>
        {contacts.length > 0 && (
          <Section>
            <h2>Contacts</h2>
            <Filter />
            <ContactList />
          </Section>
        )}
      </div>
    </>
  );
}

export default PhoneBook;

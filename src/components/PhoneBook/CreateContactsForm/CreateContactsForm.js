import React, { useState } from 'react';
import styles from './CreateContactsForm.module.css';
import { useDispatch } from 'react-redux';

import operations from '../../../redux/phoneBook/phoneBookOperations';

function CreateContactsForm() {
  const [name, setName] = useState('');
  const [number, setTel] = useState('');
  const dispatch = useDispatch();

  const changeInputField = (e) => {
    const { name, value } = e.target;
    name === 'name'
      ? setName((prevFilter) => value)
      : setTel((prevFilter) => value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(operations.addContact({ name, number }));
    e.target.reset();
    setName('');
    setTel('');
  };

  return (
    <>
      <form
        onSubmit={submitForm}
        autoComplete="off"
        className={styles.contactForm}
      >
        <div className={styles.wrapLabels}>
          <label>
            Name
            <input
              type="text"
              onChange={changeInputField}
              name="name"
              required
              value={name}
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              onChange={changeInputField}
              name="tel"
              required
              pattern="[0-9]{5,10}"
              title="от 5 до 10 цифр"
              value={number}
            />
          </label>
        </div>

        <button type="submit">Add Contact</button>
      </form>
    </>
  );
}

export default CreateContactsForm;

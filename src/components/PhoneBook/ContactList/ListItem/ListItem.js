import React from 'react';

export default function ListItem({ name, phone, onRemove }) {
  return (
    <li className="listItem">
      <p className="contactInfo">
        {name}: {phone}
      </p>
      <button onClick={onRemove} type={'button'}>
        {' '}
        remove{' '}
      </button>
    </li>
  );
}

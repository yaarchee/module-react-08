import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionsBook from '../../../redux/phoneBook/phoneBookActions';
import { getFilterQuery } from '../../../redux/phoneBook/phoneBooksSelectors';

function Filter() {
  const filterValue = useSelector(getFilterQuery);
  const dispatch = useDispatch();

  const onFilterChange = ({ target }) => {
    dispatch(actionsBook.findContact(target.value));
  };

  return (
    <label>
      Find contact by name
      <input
        type="text"
        value={filterValue}
        onChange={(e) => onFilterChange(e)}
      />
    </label>
  );
}

export default Filter;

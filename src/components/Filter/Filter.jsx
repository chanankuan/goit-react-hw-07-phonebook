import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { setFilter } from '../../redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <TextField
      id="outlined-search"
      label="Search"
      color="secondary"
      type="search"
      size="small"
      onChange={handleFilter}
      style={{ marginBottom: '20px' }}
    />
  );
};

export default Filter;

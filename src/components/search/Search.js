import React from 'react';
import { Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../slices';

export const Search = () => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  React.useEffect(() => {
    const delaySendRequest = setTimeout(() => {
      dispatch(setSearch(value));
    }, 700);
    return () => clearTimeout(delaySendRequest);
  }, [value, dispatch]);

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder="Поиск по названию"
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
};

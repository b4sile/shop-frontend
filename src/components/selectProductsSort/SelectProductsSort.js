import React from 'react';
import { NativeSelect } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setSortBy } from '../../slices';
import s from './SelectProductsSort.module.scss';

const items = [
  { name: 'Популярности(вверх)', value: '["id", "ASC"]' },
  { name: 'Популярности(вниз)', value: '["id", "DESC"]' },
  { name: 'Цене(вверх)', value: '["price", "ASC"]' },
  { name: 'Цене(вниз)', value: '["price", "DESC"]' },
  { name: 'Названию(вверх)', value: '["title", "ASC"]' },
  { name: 'Названию(вниз)', value: '["title", "DESC"]' },
];

export const SelectProductsSort = () => {
  const dispatch = useDispatch();
  const [sortOn, setSortOn] = React.useState('');

  const handleChangeSortBy = (e) => {
    const value = e.target.value;
    setSortOn(value);
    dispatch(setSortBy(value));
  };

  return (
    <>
      <NativeSelect
        className={s.select}
        value={sortOn}
        onChange={handleChangeSortBy}
      >
        <option value="" disabled>
          Сортировать по:
        </option>
        {items.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </NativeSelect>
    </>
  );
};

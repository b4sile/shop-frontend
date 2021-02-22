import { Input, InputAdornment } from '@material-ui/core';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import s from './Catalog.module.scss';
import {
  CatalogNav,
  Categories,
  SelectProductsSort,
  Products,
} from '../components';

export const Catalog = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <h1>
          <span>Учебный </span>
          Интерет-Магазин
        </h1>
        <Input
          className={s.search}
          placeholder="Поиск по названию"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <CatalogNav />
      </div>
      <div className={s.bottom}>
        <Categories />
        <div className={s.right}>
          <SelectProductsSort />
          <Products />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import s from './Catalog.module.scss';
import {
  CatalogNav,
  Categories,
  SelectProductsSort,
  Products,
  Search,
} from '../components';

export const Catalog = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <h1>
          <span>Учебный </span>
          Интерет-Магазин
        </h1>
        <Search />
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

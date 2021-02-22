import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import s from './CatalogNav.module.scss';
import { CartButton } from '../../components';

export const CatalogNav = () => {
  return (
    <ul className={s.list}>
      <li>
        <CartButton />
      </li>
      <li>
        <Button component={Link} to="/signin" endIcon={<ArrowForwardIcon />}>
          Войти
        </Button>
      </li>
    </ul>
  );
};

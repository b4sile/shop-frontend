import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { IconButton, Badge, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import s from './CatalogNav.module.scss';

export const CatalogNav = () => {
  return (
    <ul className={s.list}>
      <li>
        <IconButton component={Link} to="/cart" aria-label="cart">
          <Badge badgeContent={4}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </li>
      <li>
        <Button component={Link} to="/signin" endIcon={<ArrowForwardIcon />}>
          Войти
        </Button>
      </li>
    </ul>
  );
};

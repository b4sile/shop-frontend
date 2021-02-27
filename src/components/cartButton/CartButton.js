import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const CartButton = () => {
  const { totalCount } = useSelector(({ cart }) => cart);

  return (
    <IconButton component={Link} to="/cart" aria-label="cart">
      <Badge badgeContent={totalCount}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

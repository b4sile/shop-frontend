import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

export const CartButton = () => {
  return (
    <IconButton component={Link} to="/cart" aria-label="cart">
      <Badge badgeContent={4}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

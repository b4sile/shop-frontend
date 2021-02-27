import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import s from './CartItem.module.scss';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export const CartItem = ({ quantity, size, product, id }) => {
  const dispatch = useDispatch();
  const itemQuantity = useSelector(
    ({ cart: { items } }) => items[id] && items[id].quantity
  );

  const { title } = product || {};

  return (
    <div className={s.wrapper}>
      <div className={s.img}></div>
      <div className={s.content}>
        <h2>{title}</h2>
        <div>{size}</div>
      </div>
      <div className={s.right}>
        <div className={s.control}>{itemQuantity}</div>
        <IconButton className={s.button}>
          <HighlightOffIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

CartItem.defaultProps = {
  product: {},
};

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
};

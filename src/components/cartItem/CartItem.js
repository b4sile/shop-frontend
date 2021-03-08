import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import s from './CartItem.module.scss';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {
  fetchUpdateCartItem,
  fetchDeleteCartItem,
  plusCartItem,
  removeCartItem,
} from '../../slices';
import { findImage } from '../../utils';
import { Price } from '../../components';
import { Link } from 'react-router-dom';

export const CartItem = React.memo(({ quantity, size, product, id }) => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = React.useState(false);
  const itemQuantity = useSelector(
    ({ cart: { items } }) => items[id] && items[id].quantity
  );
  const itemId = useSelector(
    ({ cart: { items } }) => items[id] && items[id].id
  );
  const cartId = useSelector(({ cart: { cart } }) => cart && cart.id);

  const onUpdateCartItem = (value) => {
    if (cartId) {
      if (!(itemQuantity === 1 && value === -1)) setIsDisabled(true);
      dispatch(fetchUpdateCartItem(id, value, cartId))
        .then(() => setIsDisabled(false))
        .catch((err) => {
          console.log(err);
          setIsDisabled(false);
        });
    } else {
      dispatch(plusCartItem({ id, quantity: value + itemQuantity }));
    }
  };

  const onDeleteCartItem = () => {
    if (cartId) {
      setIsDisabled(true);
      dispatch(fetchDeleteCartItem(itemId, id))
        .then(() => setIsDisabled(false))
        .catch((err) => {
          console.log(err);
          setIsDisabled(false);
        });
    } else {
      dispatch(removeCartItem(id));
    }
  };

  const { title, images, price, discount } = product || {};
  const { url } = findImage({ images }) || {};

  return (
    <div className={s.wrapper}>
      <div className={s.img}>{url ? <img src={url} alt="" /> : ''}</div>
      <div className={s.content}>
        <Link to={`/products/${id}`}>
          <h2 className={s.title}>{title}</h2>
        </Link>
        <div>Размер: {size}</div>
        <div className={s.count}>В наличии: {quantity}</div>
        <Price
          className={s.price}
          title="Цена"
          price={price}
          discount={discount}
        />
      </div>
      <div className={s.right}>
        <Price
          className={s.price}
          title="Общая цена"
          price={price}
          discount={discount}
          quantity={itemQuantity}
          isVertical
        />
        <div className={s.control}>
          <div>Количество: </div>
          <div className={s.btns}>
            <IconButton
              disabled={isDisabled || itemQuantity === 1}
              onClick={() => onUpdateCartItem(-1)}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <span className={s.quantity}>{itemQuantity}</span>
            <IconButton
              disabled={isDisabled || quantity === itemQuantity}
              onClick={() => onUpdateCartItem(1)}
            >
              <ControlPointIcon />
            </IconButton>
          </div>
        </div>
        <IconButton
          disabled={isDisabled}
          onClick={onDeleteCartItem}
          className={s.button}
        >
          <HighlightOffIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
});

CartItem.defaultProps = {
  product: {},
};

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
};

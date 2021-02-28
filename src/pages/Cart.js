import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './Cart.module.scss';
import { CartItem } from '../components';
import { cartsApi } from '../api';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Button as MuiButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button } from '../components';
import { fetchClearCartItems, clearCartItems } from '../slices';

export const Cart = () => {
  const { items } = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = React.useState([]);
  const cartId = useSelector(({ cart: { cart } }) => cart && cart.id);

  const onClearCart = () => {
    if (cartId) {
      const ids = [];
      for (const item of Object.values(items)) {
        ids.push(item.id);
      }
      dispatch(fetchClearCartItems(ids));
    } else {
      dispatch(clearCartItems());
    }
  };

  React.useEffect(() => {
    const ids = Object.keys(items);
    if (ids.length > 0) {
      cartsApi
        .getCartValues(ids)
        .then(({ data }) => {
          console.log(data);
          setCartItems(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCartItems([]);
    }
  }, [dispatch, items]);

  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <h1>Корзина</h1>
        {cartItems.length > 0 && (
          <Button onClick={onClearCart}>Очистить корзину</Button>
        )}
      </div>
      {cartItems.length > 0 ? (
        <ul className={s.list}>
          {cartItems.map((item) => (
            <li key={item.id}>
              <CartItem {...item} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={s.empty}>
          <p>В вашей корзине еще нет товаров.</p>
          <MuiButton style={{ color: 'blue' }} component={Link} to="/catalog">
            Вернуться в каталог
          </MuiButton>
          <div className={s.icon}>
            <ShoppingBasketIcon />
          </div>
        </div>
      )}
    </div>
  );
};

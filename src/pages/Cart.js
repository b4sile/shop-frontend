import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './Cart.module.scss';
import { CartItem } from '../components';
import { cartsApi } from '../api';

export const Cart = () => {
  const { items } = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = React.useState([]);

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
    }
  }, [dispatch, items]);

  return (
    <div className={s.wrapper}>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <CartItem {...item} />
            </li>
          ))}
        </ul>
      ) : (
        <div>Ваша корзина пуста</div>
      )}
    </div>
  );
};

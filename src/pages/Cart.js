import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './Cart.module.scss';
import { CartItem, Button } from '../components';
import { cartsApi } from '../api';
import { Button as MuiButton } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { fetchClearCartItems, clearCartItems } from '../slices';

export const Cart = () => {
  const { items } = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = React.useState([]);
  const cartId = useSelector(({ cart: { cart } }) => cart && cart.id);
  const history = useHistory();
  const ids = Object.keys(items);

  const onClearCart = () => {
    if (cartId) {
      const ids = [];
      for (const item of Object.values(items)) {
        ids.push(item.id);
      }
      dispatch(fetchClearCartItems(ids));
    } else {
      localStorage.removeItem('cart');
      dispatch(clearCartItems());
    }
  };

  React.useEffect(() => {
    if (ids.length > 0) {
      cartsApi
        .getCartValues(ids)
        .then(({ data }) => {
          setCartItems(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCartItems([]);
    }
  }, [dispatch, ids.length]);

  const { totalPrice, totalPriceWithoutDiscount } =
    cartItems.length > 0
      ? cartItems.reduce(
          (accumulator, { id, product: { price, discount } }) => {
            if (items[id]) {
              accumulator.totalPrice =
                (accumulator.totalPrice || 0) +
                (price - (price * discount) / 100) * items[id].quantity;
              accumulator.totalPriceWithoutDiscount =
                (accumulator.totalPriceWithoutDiscount || 0) +
                items[id].quantity * price;
            }
            return accumulator;
          },
          {}
        )
      : {};

  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <div>
          <h1>Корзина</h1>
          <MuiButton color="primary" onClick={() => history.goBack()}>
            Вернуться назад
          </MuiButton>
        </div>
        {cartItems.length > 0 && (
          <div>
            <MuiButton variant="contained" onClick={onClearCart}>
              Очистить корзину
            </MuiButton>
          </div>
        )}
      </div>
      {cartItems.length > 0 ? (
        <>
          <ul className={s.list}>
            {cartItems.map((item) => (
              <li key={item.id}>
                <CartItem {...item} />
              </li>
            ))}
          </ul>
          <div className={s.total}>
            <div>
              Сумма заказа: {totalPrice}₽{' '}
              {totalPriceWithoutDiscount > totalPrice && (
                <span className={s.old}>{totalPriceWithoutDiscount}₽</span>
              )}
            </div>
          </div>
          {cartId ? (
            <Button className={s.order}>Купить</Button>
          ) : (
            <div>
              <p>Для oформления заказа необходимо войти в аккаунт.</p>
              <MuiButton component={Link} to="/signin" color="primary">
                Войти
              </MuiButton>
            </div>
          )}
        </>
      ) : (
        <div className={s.empty}>
          <p>В вашей корзине еще нет товаров.</p>
        </div>
      )}
    </div>
  );
};

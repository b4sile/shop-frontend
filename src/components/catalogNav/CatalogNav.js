import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import s from './CatalogNav.module.scss';
import { CartButton } from '../../components';
import PersonIcon from '@material-ui/icons/Person';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';
import { clearUser, clearCart, clearCartItems } from '../../slices';

export const CatalogNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const { isAuth } = useSelector(({ user }) => user);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    setAnchorEl(null);
    dispatch(clearUser());
    dispatch(clearCart());
    dispatch(clearCartItems());
  };

  return (
    <>
      <ul className={s.list}>
        <li>
          <CartButton />
        </li>
        {isAuth ? (
          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            endIcon={<PersonIcon />}
          >
            Мой аккаунт
          </Button>
        ) : (
          <li>
            <Button
              component={Link}
              to="/signin"
              endIcon={<ArrowForwardIcon />}
            >
              Войти
            </Button>
          </li>
        )}
      </ul>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Профиль</MenuItem>
        <MenuItem onClick={handleClose}>Мои заказы</MenuItem>
        <MenuItem onClick={onLogout}>Выйти</MenuItem>
      </Menu>
    </>
  );
};

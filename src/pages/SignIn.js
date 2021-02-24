import React from 'react';
import s from './SignIn.module.scss';
import { Block, Button } from '../components';
import { TextField, Button as MuiButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { fetchUserLogin } from '../slices';
import { useDispatch } from 'react-redux';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Email обязателен'),
  password: yup
    .string()
    .min(4, 'Пароль должен быть не короче 4 символов')
    .required('Пароль обязателен'),
});

export const SignIn = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(fetchUserLogin(values));
    },
  });

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
  } = formik;

  return (
    <div className={s.wrapper}>
      <Block>
        <h2>Войдите в ваш аккаунт</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            className={s.input}
            required
            id="email"
            name="email"
            label="Почта"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            className={s.input}
            required
            id="password"
            name="password"
            label="Пароль"
            type="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Button className={s.button} type="submit">
            Войти
          </Button>
        </form>
        <MuiButton className={s.register} to="/signup" component={Link}>
          Зарегистрироваться
        </MuiButton>
      </Block>
    </div>
  );
};

import React from 'react';
import { Button } from '../components';
import s from './SignUp.module.scss';
import { TextField, Snackbar, Button as MuiButton } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { usersApi } from '../api';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Email обязателен'),
  firstName: yup
    .string()
    .trim()
    .min(4, 'Имя слишком короткое')
    .required('Имя обязательно'),
  lastName: yup
    .string()
    .trim()
    .min(4, 'Фамилия слишком короткая')
    .required('Фамилия обязательна'),
  password: yup
    .string()
    .trim()
    .min(4, 'Пароль должен быть не короче 4 символов')
    .required('Пароль обязателен'),
  repeatPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

export const SignUp = () => {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      return usersApi
        .registration(values)
        .then(() => {
          setSubmitting(false);
          history.push('/signup/verify');
        })
        .catch((err) => {
          setSubmitting(false);
          setOpenSnackBar(true);
          console.log(err);
        });
    },
  });

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    isSubmitting,
  } = formik;

  const onHandleChange = (e) => {
    e.target.value = e.target.value.replace(/\s/g, '');
    handleChange(e);
  };

  return (
    <>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          className={s.input}
          required
          id="email"
          name="email"
          label="Почта"
          value={values.email}
          onChange={onHandleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          className={s.input}
          required
          id="firstName"
          name="firstName"
          label="Имя"
          value={values.firstName}
          onChange={onHandleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
        <TextField
          className={s.input}
          required
          id="lastName"
          name="lastName"
          label="Фамилия"
          value={values.lastName}
          onChange={onHandleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
        <TextField
          className={s.input}
          required
          id="password"
          name="password"
          label="Пароль"
          type="password"
          value={values.password}
          onChange={onHandleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <TextField
          className={s.input}
          required
          id="repeatPassword"
          name="repeatPassword"
          label="Повторите пароль"
          type="password"
          value={values.repeatPassword}
          onChange={onHandleChange}
          onBlur={handleBlur}
          error={touched.repeatPassword && Boolean(errors.repeatPassword)}
          helperText={touched.repeatPassword && errors.repeatPassword}
        />
        <Button disabled={isSubmitting} className={s.button} type="submit">
          Зарегистрироваться
        </Button>
        <MuiButton className={s.register} to="/signin" component={Link}>
          Войти в аккаунт
        </MuiButton>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        message="Поьзователь с данной почтой уже существует!"
      ></Snackbar>
    </>
  );
};

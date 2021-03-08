import React from 'react';
import s from './SignIn.module.scss';
import { Button } from '../components';
import { TextField, Button as MuiButton, Snackbar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
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
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(fetchUserLogin(values))
        .then(() => {
          setSubmitting(false);
          history.push('/catalog');
        })
        .catch((err) => {
          setOpenSnackBar(true);
          setSubmitting(false);
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

  return (
    <>
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
        <Button disabled={isSubmitting} className={s.button} type="submit">
          Войти
        </Button>
      </form>
      <MuiButton component={Link} to="/catalog" className={s.register}>
        Вернуться в каталог
      </MuiButton>
      <MuiButton className={s.register} to="/signup" component={Link}>
        Зарегистрироваться
      </MuiButton>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        message="Неверная почта или пароль!"
      ></Snackbar>
    </>
  );
};

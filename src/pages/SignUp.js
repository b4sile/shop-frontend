import React from 'react';
import { Block, Button } from '../components';
import s from './SignUp.module.scss';
import { TextField } from '@material-ui/core';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Email обязателен'),
  firstName: yup
    .string()
    .min(3, 'Имя слишком короткое')
    .required('Имя обязательно'),
  lastName: yup
    .string()
    .min(1, 'Введите корректную фамилию')
    .required('Фамилия обязательна'),
  password: yup
    .string()
    .min(4, 'Пароль должен быть не короче 4 символов')
    .required('Пароль обязателен'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

export const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
        <h2>Регистрация</h2>
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
            id="firstName"
            name="firstName"
            label="Имя"
            value={values.firstName}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.repeatPassword && Boolean(errors.repeatPassword)}
            helperText={touched.repeatPassword && errors.repeatPassword}
          />
          <Button className={s.button} type="submit">
            Зарегистрироваться
          </Button>
        </form>
      </Block>
    </div>
  );
};

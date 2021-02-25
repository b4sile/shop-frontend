import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export const VerifyAccount = () => {
  return (
    <div>
      <h2>Теперь вы можете войти в свой аккаунт.</h2>
      <Button component={Link} to="/signin" variant="contained">
        Войти
      </Button>
    </div>
  );
};

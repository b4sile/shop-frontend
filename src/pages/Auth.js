import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SignUp, SignIn } from '../pages';
import s from './Auth.module.scss';
import { Block, VerifyAccount } from '../components';

export const Auth = () => {
  return (
    <div className={s.wrapper}>
      <Block>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signup/verify" component={VerifyAccount} />
        </Switch>
      </Block>
    </div>
  );
};

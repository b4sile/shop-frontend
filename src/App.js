import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import s from './App.module.scss';
import Button from '@material-ui/core/Button';
import { StylesProvider } from '@material-ui/core/styles';

function App() {
  return (
    <Router>
      <StylesProvider injectFirst>
        <Button className={s.button} size="large">
          Click
        </Button>
        <div>Test</div>
      </StylesProvider>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import s from './App.module.scss';
import { StylesProvider } from '@material-ui/core/styles';
import { Home, NoMatch, Catalog, Cart, Auth, Product } from './pages';
import { fetchUserData } from './slices';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserData());
    }
  }, [dispatch]);

  return (
    <Router>
      <StylesProvider injectFirst>
        <div className={s.wrapper}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/products/:id" component={Product} />
            <Route path="/cart" component={Cart} />
            <Route path={['/signin', '/signup']} component={Auth} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
      </StylesProvider>
    </Router>
  );
}

export default App;

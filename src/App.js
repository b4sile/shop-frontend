import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import s from './App.module.scss';
import { StylesProvider } from '@material-ui/core/styles';
import { Home, NoMatch, Catalog, Cart, Auth, Product } from './pages';
import { fetchUserData, fetchCartItems } from './slices';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { id } = useSelector(({ user: { user } }) => user);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserData());
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchCartItems(id));
    }
  }, [dispatch, id]);

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

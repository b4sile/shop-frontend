import React from 'react';
import { fetchCategories } from '../../slices';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import s from './Categories.module.scss';
import { setCurrentCategory } from '../../slices';
import queryString from 'query-string';
import cn from 'classnames';

export const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(({ categories: { items } }) => items);
  const currentCategory = useSelector(
    ({ filters: { currentCategory } }) => currentCategory
  );
  const isLoading = useSelector(({ categories: { isLoading } }) => isLoading);
  const { url } = useRouteMatch();
  const { search } = useLocation();
  const { categoryId } = queryString.parse(search);

  React.useEffect(() => {
    dispatch(setCurrentCategory(+categoryId || null));
  }, [categoryId, dispatch]);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <ul className={s.list}>
      <li>
        <Link className={cn({ [s.active]: !currentCategory })} to={`${url}`}>
          Все
        </Link>
      </li>
      {categories.map(({ id, name }) => (
        <li className={cn({ [s.active]: id === currentCategory })} key={id}>
          <Link to={`${url}?categoryId=${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};

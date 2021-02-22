import React from 'react';
import { fetchProducts } from '../../slices';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCart } from '../../components';
import s from './Products.module.scss';

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(({ products: { items } }) => items);

  const currentCategory = useSelector(
    ({ filters: { currentCategory } }) => currentCategory
  );

  const sort = useSelector(({ filters: { sortBy } }) => sortBy);

  React.useEffect(() => {
    dispatch(fetchProducts(currentCategory, sort));
  }, [dispatch, currentCategory, sort]);

  return (
    <div className={s.content}>
      {products.map((product) => (
        <ProductCart key={product.id} {...product} />
      ))}
    </div>
  );
};

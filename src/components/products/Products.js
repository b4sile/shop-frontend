import React from 'react';
import { fetchProducts } from '../../slices';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCart } from '../../components';
import s from './Products.module.scss';

export const Products = React.memo(() => {
  const dispatch = useDispatch();
  const { items } = useSelector(({ products }) => products);

  const currentCategory = useSelector(
    ({ filters: { currentCategory } }) => currentCategory
  );

  const { sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchProducts(currentCategory, sortBy));
  }, [dispatch, currentCategory, sortBy]);

  return (
    <div className={s.content}>
      {items.map((product) => (
        <ProductCart key={product.id} {...product} />
      ))}
    </div>
  );
});

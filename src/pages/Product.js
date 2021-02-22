import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import s from './Product.module.scss';
import { CatalogNav, Price } from '../components';
import { Button } from '@material-ui/core';
import { productsApi } from '../api';

export const Product = () => {
  const [product, setProduct] = React.useState(null);
  const { id } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    productsApi
      .getProduct(id)
      .then(({ data }) => setProduct(data))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log(product);
  const { title, description, price, discount, product_meta, images } =
    product || {};

  return (
    <div className={s.wrapper}>
      {product && (
        <>
          <div className={s.images}></div>
          <div className={s.info}>
            <h2>{title}</h2>
            <Price isVertical price={price} discount={discount} />
            <p>{description}</p>
          </div>
        </>
      )}
      <div className={s.right}>
        <CatalogNav />
        <Button className={s.back} onClick={() => history.goBack()}>
          Назад
        </Button>
      </div>
    </div>
  );
};

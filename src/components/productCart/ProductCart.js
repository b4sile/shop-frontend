import React from 'react';
import { Link } from 'react-router-dom';
import s from './ProductCart.module.scss';
import { Price } from '../../components';
import { findImage } from '../../utils';

export const ProductCart = ({ title, images, price, discount, id }) => {
  const titleImage = findImage({ images, isNeedTitleImage: true });

  return (
    <Link to={`products/${id}`}>
      <div className={s.cart}>
        {titleImage ? (
          <img className={s.img} src={titleImage.url} alt={`${title}`} />
        ) : (
          <div className={s.img}></div>
        )}
        <div className={s.bottom}>
          <h2>{title}</h2>
          <Price price={price} discount={discount} />
        </div>
      </div>
    </Link>
  );
};

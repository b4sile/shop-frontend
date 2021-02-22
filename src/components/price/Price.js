import React from 'react';
import s from './Price.module.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Price = ({ discount, price, isVertical }) => {
  return (
    <div>
      {discount > 0 ? (
        <div className={cn(s.prices, { [s.vertical]: isVertical })}>
          <span>{Math.floor(price - (price * discount) / 100)}₽</span>
          <span className={s.old}>{price}₽</span>
        </div>
      ) : (
        <div className={s.prices}>{price}₽</div>
      )}
    </div>
  );
};

Price.defaultProps = {
  isVertical: false,
};

Price.propTypes = {
  discount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  isVertical: PropTypes.bool,
};

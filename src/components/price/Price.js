import React from 'react';
import s from './Price.module.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Price = ({
  discount,
  price,
  isVertical,
  className,
  quantity,
  title,
}) => {
  return (
    <div>
      {discount > 0 ? (
        <div className={cn(s.prices, className, { [s.vertical]: isVertical })}>
          {title && <span>{title}: </span>}
          <span className={s.current}>
            {((price - (price * discount) / 100) * quantity).toFixed(2)}₽
          </span>
          <span className={s.old}>{(price * quantity).toFixed(2)}₽</span>
        </div>
      ) : (
        <div className={cn(s.prices, className, { [s.vertical]: isVertical })}>
          {title && <span>{title}: </span>}
          <span className={s.current}>{(price * quantity).toFixed(2)}₽</span>
        </div>
      )}
    </div>
  );
};

Price.defaultProps = {
  isVertical: false,
  quantity: 1,
  title: '',
};

Price.propTypes = {
  discount: PropTypes.number.isRequired,
  quantity: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number.isRequired,
  isVertical: PropTypes.bool,
  className: PropTypes.string,
};

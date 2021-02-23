import React from 'react';
import PropTypes from 'prop-types';
import s from './Images.module.scss';
import cn from 'classnames';
import { findImage } from '../../utils';

export const Images = ({ images, className }) => {
  const image = findImage({ images });
  const [mainImage, setMainImage] = React.useState(image && image.url);

  const onChangeImage = (url) => {
    setMainImage(url);
  };

  return (
    <div className={cn(s.images, className)}>
      <img className={s.main} src={mainImage} alt="" />
      <div className={s.list}>
        {images.map(({ url, id }) => (
          <img
            onClick={() => onChangeImage(url)}
            className={s.usual}
            src={url}
            alt=""
            key={id}
          />
        ))}
      </div>
    </div>
  );
};

Images.defaultProps = {
  images: [],
};

Images.propTypes = {
  className: PropTypes.string,
  images: PropTypes.array,
};

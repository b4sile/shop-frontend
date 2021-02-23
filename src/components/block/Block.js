import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './Block.module.scss';

export const Block = ({ children, className }) => {
  return <div className={cn(s.block, className)}>{children}</div>;
};

Block.propTypes = {
  className: PropTypes.string,
};

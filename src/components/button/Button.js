import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';
import cn from 'classnames';
import s from './Button.module.scss';

export const Button = (props) => {
  return <ButtonBase {...props} className={cn(s.button, props.className)} />;
};

Button.propTypes = {
  className: PropTypes.string,
};

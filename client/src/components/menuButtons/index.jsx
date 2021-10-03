import React from 'react';
import clsx from 'clsx';
import { PropTypes } from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import { menuButtonsStyles } from './styles';

export default function MenuButtons(props) {
  const defaultClasses = menuButtonsStyles();
  const { children, classes, variant, color, handleClick } = props;

  return children?.map((option, index) => (
    <Tooltip placement="bottom" title="Próximamente">
      <span>
        {' '}
        {/* // TODO: remove tooltip & span when functional */}
        <Button
          key={index}
          className={clsx([defaultClasses.menuButton, classes?.menuButton])}
          variant={variant || 'contained'}
          color={color || 'secondary'}
          id={option.toLowerCase()}
          onClick={(e) => handleClick(e, option.toLowerCase())}
          disabled // TODO: give functionality
        >
          {option}
        </Button>
      </span>
    </Tooltip>
  ));
}

MenuButtons.prototypes = {
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.object,
  variant: PropTypes.string,
  color: PropTypes.string,
  handleClick: PropTypes.func,
};

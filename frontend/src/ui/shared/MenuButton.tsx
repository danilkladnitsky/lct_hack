import React from 'react';
import { Button, ButtonProps } from '@mantine/core';
import classNames from 'classnames';

import styles from './MenuButton.module.scss';

interface Props {
  selected?: boolean;
  onClick?: () => void;
}

const MenuButton = ({ selected, onClick, ...rest }: ButtonProps & Props) => {
  return (
    <Button
      variant={'outline'}
      compact
      radius={0}
      className={classNames(styles.menuBtn, { [styles.selected]: selected })}
      onClick={onClick}
      {...rest} />
  );
};

export default MenuButton;

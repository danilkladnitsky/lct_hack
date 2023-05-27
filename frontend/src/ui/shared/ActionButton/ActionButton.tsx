import React from 'react';
import { Button, ButtonProps } from '@mantine/core';
import classNames from 'classnames';

import styles from './ActionButton.module.scss';

interface Props {
  selected?: boolean;
  onClick?: () => void;
}

const ActionButton = ({ selected, onClick, className, ...rest }: ButtonProps & Props) => {
  return (
    <Button
      variant={'outline'}
      compact
      radius={0}
      className={classNames(styles.btn, { [styles.selected]: selected }, className)}
      onClick={onClick}
      {...rest} />
  );
};

export default ActionButton;

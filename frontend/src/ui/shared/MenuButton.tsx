import React from 'react';
import { Button, ButtonProps } from '@mantine/core';

import styles from './MenuButton.module.scss';

const MenuButton = (props: ButtonProps) => {
  return (
    <Button
      variant={'outline'}
      compact
      className={styles.menuBtn}
      {...props} />
  );
};

export default MenuButton;

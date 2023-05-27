import React from 'react';
import { Title as MantineTitle, TitleProps } from '@mantine/core';

import styles from './Title.module.scss';

const Title = (props: TitleProps) => {
  return (
    <div className={styles.titleWrapper}>
      <MantineTitle order={2}
        weight="bold"
        {...props} />
    </div>
  );
};

export default Title;

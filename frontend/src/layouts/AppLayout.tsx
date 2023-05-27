import React, { ReactNode } from 'react';
import Menu from 'ui/components/Menu/Menu';

import styles from './AppLayout.module.scss';

interface Props {
    children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className={styles.appLayout}>
      <Menu />
      {children}
    </div>
  );
};

export default AppLayout;

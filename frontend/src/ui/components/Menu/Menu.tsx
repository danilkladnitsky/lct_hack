import React from 'react';
import { History, Map } from 'tabler-icons-react';
import MenuButton from 'ui/shared/MenuButton';

import styles from './Menu.module.scss';

const Menu = () => {
  return (
    <div className={styles.menu}>
      <MenuButton>
        <Map />
      </MenuButton>
      <MenuButton>
        <History />
      </MenuButton>
    </div>
  );
};

export default Menu;

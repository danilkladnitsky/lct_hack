import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from 'constants/RouterPaths';
import { Analyze, History, Map } from 'tabler-icons-react';
import MenuButton from 'ui/shared/MenuButton';

import styles from './Menu.module.scss';

const NAV_SCHEMA = [
  {
    Icon: Map,
    route: PATHS.dashboard,
  },
  {
    Icon: Analyze,
    route: PATHS.analyze,
  },
  {
    Icon: History,
    route: PATHS.history,
  },
];

const Menu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleRedirect = (link: string) => {
    navigate(link);
  };

  return (
    <div className={styles.menu}>
      {NAV_SCHEMA.map(
        ({ Icon, route }) => <MenuButton
          key={route}
          selected={route === pathname}
          onClick={() => handleRedirect(route)}
        >
          <Icon />
        </MenuButton>,
      )
      }
    </div>
  );
};

export default Menu;

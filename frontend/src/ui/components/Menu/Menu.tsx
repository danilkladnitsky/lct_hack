import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from 'constants/RouterPaths';
import { Analyze, History, Logout,Map } from 'tabler-icons-react';
import ActionButton from 'ui/shared/ActionButton/ActionButton';

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
  {
    Icon: Logout,
    route: PATHS.signIn,
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
        ({ Icon, route }) => <ActionButton
          key={route}
          selected={route === pathname}
          onClick={() => handleRedirect(route)}
          className={styles.menuBtn}
        >
          <Icon />
        </ActionButton>,
      )
      }
    </div>
  );
};

export default Menu;

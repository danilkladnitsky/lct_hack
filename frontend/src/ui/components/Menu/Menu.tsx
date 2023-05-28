import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthService } from 'api';
import { PATHS } from 'constants/RouterPaths';
import { Analyze, History, Logout, Map } from 'tabler-icons-react';
import ActionButton from 'ui/shared/ActionButton/ActionButton';

import useCombinedStore from 'store';

import styles from './Menu.module.scss';

const NAV_SCHEMA = [
  {
    Icon: Map,
    route: PATHS.dashboard,
  },
  {
    Icon: History,
    route: PATHS.history,
  },
];

const Menu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { logout } = useCombinedStore();

  const handleRedirect = (link: string) => {
    navigate(link);
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      logout();
    } catch (e) {
      console.debug(e);
    }
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
      <ActionButton
        onClick={handleLogout}
        className={styles.menuBtn}
      >
        <Logout />
      </ActionButton>
    </div>
  );
};

export default Menu;

import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { AuthService } from 'api';
import { IS_DEV } from 'env';
import { DashboardPage, History, SignIn, SignUp } from 'pages';

import useCombinedStore from 'store';

import { PATHS } from '../constants/RouterPaths';

const Router = () => {
  const { isLogined, login, logout, isPendingAuth } = useCombinedStore();

  const authInfo = async () => {
    try {
      await AuthService.info();
      login();
    } catch (e) {
      logout();
    }
  };

  useEffect(() => {
    if (!IS_DEV) {
      authInfo();
    } else {
      login();
    }
  }, []);

  if (isPendingAuth) {
    return <Loader />;
  }

  if (!isLogined) {
    return <Routes>
      <Route
        path={PATHS.signIn}
        element={SignIn}
      />
      <Route
        path={PATHS.signUp}
        element={SignUp}
      />
      <Route
        path={PATHS.redirect}
        element={
          <Navigate
            to={PATHS.signIn}
            replace
          />
        }
      />
    </Routes>;
  }

  return <Routes>
    <Route
      path={PATHS.dashboard}
      element={DashboardPage}
    />
    <Route
      path={PATHS.history}
      element={History}
    />
    <Route
      path={PATHS.redirect}
      element={
        <Navigate
          to={PATHS.dashboard}
          replace
        />
      }
    />
  </Routes>;

};

export default Router;

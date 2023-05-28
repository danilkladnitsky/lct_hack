import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthService } from 'api';
import { DashboardPage, History, SignIn, SignUp } from 'pages';

import useCombinedStore from 'store';

import { PATHS } from '../constants/RouterPaths';

const Router = () => {
  const { isLogined, login, logout, isLoading } = useCombinedStore();

  useEffect(() => {
    const authInfo = async () => {
      try {
        await AuthService.info();
        login();
      } catch (e) {
        logout();
      }
    };

    authInfo();

  }, []);

  return (
    <>
      {!isLoading && (<Routes>
        {isLogined ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}

      </Routes>)}
    </>

  );
};

export default Router;

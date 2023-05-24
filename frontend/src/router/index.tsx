import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard, History, Root,SignIn, SignUp } from 'pages';

import { PATHS } from '../constants/RouterPaths';

interface RouterProps {
  isLogined: boolean
}

const Router: FC<RouterProps> = ({ isLogined }) => {

  return (
    <Routes>
      {isLogined ? (
        <>
          <Route
            path={PATHS.dashboard}
            element={<Dashboard />}
          />
          <Route
            path={PATHS.history}
            element={<History />}
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
            element={<SignIn />}
          />
          <Route
            path={PATHS.signUp}
            element={<SignUp />}
          />
          <Route
            path={PATHS.redirect}
            element={
              <Navigate
                to={PATHS.root}
                replace
              />
            }
          />
        </>
      )}

      <Route
        path={PATHS.root}
        element={<Root />}
      />
    </Routes>
  );
};

export default Router;

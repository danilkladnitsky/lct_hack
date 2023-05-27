import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardPage, History, SignIn, SignUp } from 'pages';
import Analyze from 'pages/Analyze';

import { PATHS } from '../constants/RouterPaths';

const Router = () => {
  return (
    <Routes>
      <Route
        path={PATHS.root}
        element={SignIn}
      />
      <Route
        path={PATHS.dashboard}
        element={DashboardPage}
      />
      <Route
        path={PATHS.analyze}
        element={Analyze}
      />
      <Route
        path={PATHS.history}
        element={History}
      />
      <Route
        path={PATHS.signIn}
        element={SignIn}
      />
      <Route
        path={PATHS.signUp}
        element={SignUp}
      />
    </Routes>
  );
};

export default Router;

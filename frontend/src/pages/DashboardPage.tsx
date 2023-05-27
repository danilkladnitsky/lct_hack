import React, { FC } from 'react';
import withLayout from 'hoc/withLayout';
import { AppLayout } from 'layouts';
import Dashboard from 'ui/components/Dashboard/Dashboard';

const DashboardPage: FC = () => {
  return (
    <Dashboard />
  );
};

export default withLayout(AppLayout, <DashboardPage />);

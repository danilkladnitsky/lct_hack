import React, { FC } from 'react';
import withLayout from 'hoc/withLayout';
import { AppLayout } from 'layouts';
import Dashboard from 'ui/components/Dashboard/Dashboard';
import AnalyzeForm from 'ui/widgets/AnalyzeForm/AnalyzeForm';

const DashboardPage: FC = () => {

  return (
    <>
      <Dashboard />
      <AnalyzeForm />
    </>
  );
};

export default withLayout(AppLayout, <DashboardPage />);

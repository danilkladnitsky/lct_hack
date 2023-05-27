import React, { FC } from 'react';
import withLayout from 'hoc/withLayout';
import { AppLayout } from 'layouts';

const Dashboard: FC = () => {
  return (
    <>
      <p>Dashboard</p>
    </>
  );
};

export default withLayout(AppLayout, <Dashboard />);

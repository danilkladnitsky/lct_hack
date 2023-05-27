import React, { FC } from 'react';
import withLayout from 'hoc/withLayout';
import { AppLayout } from 'layouts';

const History: FC = () => {
  return (
    <div>
      <p>History</p>
    </div>
  );
};

export default withLayout(AppLayout, <History />);

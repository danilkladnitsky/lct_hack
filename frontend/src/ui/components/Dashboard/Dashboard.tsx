import React from 'react';

import Map from '../Map/Map';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Map />
    </div>
  );
};

export default Dashboard;

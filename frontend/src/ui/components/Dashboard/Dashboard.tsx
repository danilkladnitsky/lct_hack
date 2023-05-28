import React from 'react';

import useCombinedStore from 'store';

import Map from '../Map/Map';
import MapFooter from '../MapFooter/MapFooter';
import MapLayers from '../MapLayers/MapLayers';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const mapSettings = useCombinedStore(state => state.mapSettings);

  return (
    <div className={styles.dashboard}>
      <Map viewSettings={mapSettings} />
      <MapLayers />
      <MapFooter />

    </div>
  );
};

export default Dashboard;

import React, { useMemo, useState } from 'react';
import { DEFAULT_MAP_PARAMETERS } from 'constants/map';
import convertEventsToMapData from 'utils/convertEventsToMapData';

import useCombinedStore from 'store';

import Map from '../Map/Map';
import MapFooter from '../MapFooter/MapFooter';
import MapLayers from '../MapLayers/MapLayers';
import MapTooltip from '../MapTooltip/MapTooltip';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { events, mapSettings, setPoint, selectedPoint } = useCombinedStore();

  return (
    <div className={styles.dashboard}>
      <Map
        viewSettings={mapSettings}
        data={convertEventsToMapData(events)}
        onPointClick={setPoint}
      />
      <MapLayers />
      <MapTooltip
        isOpened={Boolean(selectedPoint)}
        points={selectedPoint?.points}
      />
      <MapFooter />

    </div>
  );
};

export default Dashboard;

import React, { useMemo, useState } from 'react';
import { DEFAULT_MAP_PARAMETERS } from 'constants/map';
import convertAnalysisToMapData from 'utils/convertAnalysisToMapData';
import convertEventsToMapData from 'utils/convertEventsToMapData';

import useCombinedStore from 'store';

import Map from '../Map/Map';
import MapFooter from '../MapFooter/MapFooter';
import MapLayers from '../MapLayers/MapLayers';
import MapTooltip from '../MapTooltip/MapTooltip';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { events, mapSettings, setPoint, selectedPoint, analyzeResponse } = useCombinedStore();

  const mapPoints = useMemo(() => ([
    ...convertEventsToMapData(events),
    ...convertAnalysisToMapData(analyzeResponse || [])
  ]), [events, analyzeResponse]);

  return (
    <div className={styles.dashboard}>
      <Map
        viewSettings={mapSettings}
        data={mapPoints}
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

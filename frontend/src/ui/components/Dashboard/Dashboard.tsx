import React, { useEffect, useMemo, } from 'react';
import useGetOptions from 'api/hooks/use-get-options';
import convertAddressesToMapData from 'utils/convertAddressesToMapData';
import convertAnalysisToMapData from 'utils/convertAnalysisToMapData';

import useCombinedStore from 'store';

import Map from '../Map/Map';
import MapFooter from '../MapFooter/MapFooter';
import MapLayers from '../MapLayers/MapLayers';
import MapTooltip from '../MapTooltip/MapTooltip';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { events, mapSettings, setPoint, selectedPoint, analyzeResponse, options } = useCombinedStore();

  const { mutate: fetchOptions } = useGetOptions();

  useEffect(() => {
    fetchOptions();
  }, []);

  const mapPoints = useMemo(() => ([
    ...convertAddressesToMapData(options?.addresses || []),
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

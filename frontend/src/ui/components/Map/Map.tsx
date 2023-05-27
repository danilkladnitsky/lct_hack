import React from 'react';
import { Map as GlMap } from 'react-map-gl';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';
import maplibregl from 'maplibre-gl';

import styles from './Map.module.scss';

const INITIAL_VIEW_STATE = {
  zoom: 0,
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';
const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json'; // eslint-disable-line

const Map = () => {
  const layers = [
    new HeatmapLayer({
      data: DATA_URL,
      id: 'heatmp-layer',
      pickable: false,
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}>
      {/* <Map
        mapLib={maplibregl}
        mapStyle={MAP_STYLE}
        preventStyleDiffing={true}
      /> */}
    </DeckGL>
  );
};

export default Map;

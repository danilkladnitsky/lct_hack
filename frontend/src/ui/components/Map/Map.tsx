import React from 'react';
import { Map as GlMap } from 'react-map-gl';
import { MAP_STYLE } from 'const/map';
import { DEFAULT_MAP_PARAMETERS } from 'constants/map';
import DeckGL from 'deck.gl';
import maplibregl from 'maplibre-gl';
import { MapSettings } from 'types/map';

interface Props {
  viewSettings: MapSettings;
}

const Map = ({
  viewSettings = DEFAULT_MAP_PARAMETERS
}: Props) => {
  return (
    <DeckGL
      controller={true}
      initialViewState={viewSettings}
    >
      <GlMap
        reuseMaps
        mapLib={maplibregl}
        mapStyle={MAP_STYLE}
      />
    </DeckGL>
  );
};

export default Map;

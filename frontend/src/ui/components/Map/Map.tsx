import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Map as GlMap } from 'react-map-gl';
import { MAP_STYLE } from 'const/map';
import { DEFAULT_MAP_PARAMETERS } from 'constants/map';
import DeckGL from 'deck.gl';
import maplibregl from 'maplibre-gl';
import { MapData, MapObject, MapSettings } from 'types/map';

import MapTooltip from '../MapTooltip/MapTooltip';

import { renderLayers } from './MapLayers';

function getTooltip({ object }:{object: MapObject}) {
  if (!object) {
    return null;
  }

  return ReactDOMServer.renderToString(<MapTooltip points={object.points} />);
}
interface Props {
  viewSettings: MapSettings;
  data: MapData[];
  onPointClick: (point: MapObject | null) => void;
}

const Map = ({
  viewSettings = DEFAULT_MAP_PARAMETERS,
  data,
  onPointClick
}: Props) => {
  const tooltipHandler = ({ object }: {object: MapObject}) => {
    if (!object) return null;

    onPointClick(object);
  };

  return (
    <DeckGL
      controller={true}
      initialViewState={viewSettings}
      layers={renderLayers(data)}
      onClick={tooltipHandler}
      onViewStateChange={() => {
        onPointClick(null);
      }}
    >
      <GlMap
        reuseMaps
        mapLib={maplibregl}
        mapStyle={MAP_STYLE}
        preventStyleDiffing={true}
        getTooltip={getTooltip}
      />
    </DeckGL>
  );
};

export default Map;

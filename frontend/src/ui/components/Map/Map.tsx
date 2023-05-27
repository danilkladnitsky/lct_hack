import React, { useState } from "react";
import { Map as GlMap } from "react-map-gl";
import { DEFAULT_MAP_PARAMETERS } from "constants/map";
import DeckGL from "deck.gl";
import maplibregl from "maplibre-gl";

import { renderLayers } from "./MapLayers";

import styles from "./Map.module.scss";

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

interface Props {
  lng: number;
  lat: number;
  zoom: number;
}

const Map = ({
  lat = DEFAULT_MAP_PARAMETERS.lat,
  lng = DEFAULT_MAP_PARAMETERS.lng,
  zoom = DEFAULT_MAP_PARAMETERS.zoom
}: Props) => {
  const [viewState] = useState({
    longitude: lat,
    latitude: lng,
    zoom: zoom,
    maxZoom: 16
  });

  return (
    <DeckGL
      layers={renderLayers()}
      controller={true}
      initialViewState={viewState}
    >
      <GlMap
        reuseMaps
        mapLib={maplibregl}
        mapStyle={MAP_STYLE}
        preventStyleDiffing={true}
      />
    </DeckGL>
  );
};

export default Map;

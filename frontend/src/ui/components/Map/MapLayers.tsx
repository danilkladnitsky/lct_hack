import { HeatmapLayer } from "@deck.gl/aggregation-layers";

export function renderLayers() {
  const heatMapLayer = new HeatmapLayer({
    id: "heatmp-layer",
    pickable: false,
    data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json",
    radiusPixels: 10,
    intensity: 1,
    threshold: 0.05,
  });

  return [heatMapLayer];
}

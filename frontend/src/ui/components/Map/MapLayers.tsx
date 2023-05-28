import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { MapData } from 'types/map';

export function renderLayers(data: MapData[]) {
  const colorRange = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
  ];

  const material = {
    ambient: 0.64,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [51, 51, 51]
  };

  const eventsLayer = new HexagonLayer({
    id: 'heatmap',
    colorRange,
    coverage: 0.5,
    data,
    getPosition: (d) => [+d.longitude, +d.latitude],
    pickable: true,
    radius: 100,
    material,
    elevationRange: [0, 50],
    elevationScale: 50,
    extruded: true,
    transitions: {
      elevationScale: 10
    }
  });

  return [eventsLayer];
}

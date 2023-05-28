import { MapAddress, MapData } from 'types/map';

const convertAddressesToMapData = (data: MapAddress[], weight?: (unom: number) => number): MapData[] => {
  return data.map(d => ({
    ...d,
    type: 'address',
    latitude: +d.latitude,
    longitude: +d.longitude,
    name: d.address,
    layer: 'address',
    value: `${34} инцидента`,
    weight:  weight ? weight(d.unom) : 0
  }));
};

export default convertAddressesToMapData;

import { MapAddress, MapData } from 'types/map';

const convertAddressesToMapData = (data: MapAddress[]): MapData[] => {
  return data.map(d => ({
    ...d,
    type: 'address',
    latitude: +d.latitude,
    longitude: +d.longitude,
    name: d.address,
    layer: 'address',
    value: `${34} инцидента`
  }));
};

export default convertAddressesToMapData;

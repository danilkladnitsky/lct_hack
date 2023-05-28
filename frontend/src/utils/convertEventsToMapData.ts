import { EventRecord } from 'types/event';
import { MapData } from 'types/map';

const convertEventsToMapData = (events: EventRecord[]): MapData[] => {
  return events.map(e => ({ ...e, latitude: e.lat, longitude:  e.lng, layer: 'Инциденты', name: e.name }));
};

export default convertEventsToMapData;

import { EventRecord } from 'types/event';
import { MapData } from 'types/map';

const convertEventsToMapData = (events: EventRecord[]): MapData[] => {
  return events.map(e => ({
    ...e,
    latitude: e.latitude,
    longitude: e.longitude,
    layer: 'incident',
    name: e.name,
    value: e.description,
    unom: e.unom
  }));
};

export default convertEventsToMapData;

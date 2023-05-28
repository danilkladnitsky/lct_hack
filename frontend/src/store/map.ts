import { StateCreator } from 'zustand';
import { DEFAULT_MAP_PARAMETERS } from 'constants/map';
import { EventRecord } from 'types/event';

type State = {
  events: EventRecord[];
  mapSettings: {
    lng: Longitude;
    lat: Latitude;
    zoom: number;
  }
}

type Actions = {
    setEvents: (events: EventRecord[]) => void;
}

export type MapSlice = State & Actions;

const initialState: State = {
  events: [],
  mapSettings: DEFAULT_MAP_PARAMETERS
};

export const createMapSlice: StateCreator<MapSlice> = (set) => ({
  ...initialState,
  setEvents: (events) => {
    set({ events });
  }
});

import { StateCreator } from 'zustand';
import { DEFAULT_MAP_PARAMETERS } from 'constants/map';
import { MOCKED_EVENTS } from 'mocked/events';
import { EventRecord } from 'types/event';
import { MapObject, MapSettings } from 'types/map';

type State = {
  events: EventRecord[];
  mapSettings: MapSettings;
  selectedPoint: MapObject | null;
}

type Actions = {
  setEvents: (events: EventRecord[]) => void;
  setPoint: (point: MapObject | null) => void;
}

export type MapSlice = State & Actions;

const initialState: State = {
  events: MOCKED_EVENTS,
  mapSettings: DEFAULT_MAP_PARAMETERS,
  selectedPoint: null
};

export const createMapSlice: StateCreator<MapSlice> = (set) => ({
  ...initialState,
  setEvents: (events) => {
    set({ events });
  },
  setPoint: (point) => {
    set({ selectedPoint: point });
  }
});

import { StateCreator } from 'zustand';
import { HistoryRecord } from 'types/history';

type State = {
    records: HistoryRecord[];
    selectedRecords: HistoryRecord | null;
}

type Actions = {
  selectRecord: (id: Id) => void;
  setHistory: (records: HistoryRecord[]) => void;
}

export type HistorySlice = State & Actions;

const initialState: State = {
  records: [], //TODO: remove mocked data
  selectedRecords: null,
};

export const createHistorySlice: StateCreator<HistorySlice> = (set, state) => ({
  ...initialState,
  selectRecord: (id) => {
    const { records } = state();

    const record = records.find(record => record.id === id);

    if (record) {
      set({ selectedRecords:record });
    }
  },
  setHistory: (records) => {
    set({ records });
  },
});

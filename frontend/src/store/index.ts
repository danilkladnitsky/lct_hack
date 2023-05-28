import { create } from 'zustand';

import { AnalyzeSlice, createAnalyzeSlice } from './analyze';
import { AuthSlice, createAuthSlice } from './auth';
import { createHistorySlice, HistorySlice } from './history';
import { createMapSlice, MapSlice } from './mapSlice';
import { createUiSlice, UiSlice } from './uiSlice';

type Store = AuthSlice & HistorySlice & AnalyzeSlice & UiSlice & MapSlice;

const useCombinedStore = create<Store>()((...a) => ({
  ...createAuthSlice(...a),
  ...createHistorySlice(...a),
  ...createAnalyzeSlice(...a),
  ...createUiSlice(...a),
  ...createMapSlice(...a)

}));

export default useCombinedStore;

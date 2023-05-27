import { create } from 'zustand';

import { AuthSlice, createAuthSlice } from './auth';
import { createHistorySlice, HistorySlice } from './history';

const useCombinedStore = create<AuthSlice & HistorySlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createHistorySlice(...a),

}));

export default useCombinedStore;

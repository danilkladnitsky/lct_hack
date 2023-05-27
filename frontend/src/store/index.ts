import { create } from "zustand";

import { AuthSlice, createAuthSlice } from './auth';
import { createCoreSlice } from "./core";
import { createHistorySlice, HistorySlice } from './history';

const useCombinedStore = create<AuthSlice & HistorySlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createHistorySlice(...a),
  ...createCoreSlice(...a)

}));

export default useCombinedStore;

import { create } from "zustand";

import { AnalyzeSlice, createAnalyzeSlice } from "./analyze";
import { AuthSlice, createAuthSlice } from "./auth";
import { createHistorySlice, HistorySlice } from "./history";

const useCombinedStore = create<AuthSlice & HistorySlice & AnalyzeSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createHistorySlice(...a),
  ...createAnalyzeSlice(...a)

}));

export default useCombinedStore;

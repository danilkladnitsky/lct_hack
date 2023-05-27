import { create } from "zustand";

import { AnalyzeSlice, createAnalyzeSlice } from "./analyze";
import { AuthSlice, createAuthSlice } from "./auth";
import { createHistorySlice, HistorySlice } from "./history";
import { createUiSlice, UiSlice } from "./uiSlice";

type Store = AuthSlice & HistorySlice & AnalyzeSlice & UiSlice;

const useCombinedStore = create<Store>()((...a) => ({
  ...createAuthSlice(...a),
  ...createHistorySlice(...a),
  ...createAnalyzeSlice(...a),
  ...createUiSlice(...a)

}));

export default useCombinedStore;

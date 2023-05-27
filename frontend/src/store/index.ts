import { create } from "zustand";

import { AuthSlice, createAuthSlice } from "./auth";
import { CoreSlice, createCoreSlice } from "./core";
import { createHistorySlice, HistorySlice } from "./history";

const useCombinedStore = create<AuthSlice & HistorySlice & CoreSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createHistorySlice(...a),
  ...createCoreSlice(...a)

}));

export default useCombinedStore;

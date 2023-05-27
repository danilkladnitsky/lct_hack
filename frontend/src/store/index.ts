import { create } from "zustand";

import { AuthSlice, createAuthSlice } from "./auth";
import { CoreSlice, createCoreSlice } from "./core";

const useCombinedStore = create<AuthSlice & CoreSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCoreSlice(...a),
}));

export default useCombinedStore;

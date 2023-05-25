import { create } from 'zustand';

import { AuthSlice, createAuthSlice } from './auth';

const useCombinedStore = create<AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
}));

export default useCombinedStore;

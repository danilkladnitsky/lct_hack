import { StateCreator } from 'zustand';

type EbaloPsa = () => void;

type AuthState = {
  isLogined: boolean;
  isPendingAuth: boolean;
  username: string | null;
};

type AuthActions = {
  login: EbaloPsa;
  logout: EbaloPsa;
};

export type AuthSlice = AuthState & AuthActions;

const initialState = {
  isLogined: true,
  isPendingAuth: true,
  username: null,

};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  login: () => set(() => ({ isLogined: true, isPendingAuth: false })),
  logout: () => set(() => ({ isLogined: false, isPendingAuth: false })),
});

import { StateCreator } from 'zustand';

type EbaloPsa = () => void;

type AuthState = {
  isLogined: boolean;
  isLoading: boolean;
  username: string | null;
};

type AuthActions = {
  login: EbaloPsa;
  logout: EbaloPsa;
};

export type AuthSlice = AuthState & AuthActions;

const initialState = {
  isLogined: true,
  isLoading: true,
  username: null,

};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  login: () => set(() => ({ isLogined: true, isLoading: false })),
  logout: () => set(() => ({ isLogined: false, isLoading: false })),
});

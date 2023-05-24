import { StateCreator } from 'zustand';

type EbaloPsa = () => void

type AuthState = {
  isLogined: boolean
  username: string | null
  id: number | null
}

type AuthActions = {
  login: EbaloPsa
  logout: EbaloPsa
}

export type AuthSlice = AuthState & AuthActions

const initialState = {
  isLogined: false,
  username: null,
  id: null,
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  login: () => set(() => ({ isLogined: true, username: 'x1kk4', id: 1337 })),
  logout: () => set(() => ({ isLogined: false, username: null, id: null })),
});

import { StateCreator } from "zustand";

type State = {
    analyzeFrameVisible: boolean;
};

type Actions = {
  setAnalyzeFrameVisibility: (status: boolean) => void;
};

export type UiSlice = State & Actions;

const initialState: State = {
  analyzeFrameVisible: false,
};

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  ...initialState,
  setAnalyzeFrameVisibility: (isVisible) => {
    set({ analyzeFrameVisible: isVisible });
  }
});

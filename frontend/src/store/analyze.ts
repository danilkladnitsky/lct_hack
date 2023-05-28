import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { GetOptionsResponse, ResultRequest, ResultResponse } from 'types/core';

type AnalyzeState = {
  options: GetOptionsResponse | null;
  analyzeRequest: ResultRequest;
  result: ResultResponse | null;
};

type AnalyzeActions = {
  setOptions: (data: GetOptionsResponse) => void;
  setResult: (data: ResultResponse) => void;
};

export type AnalyzeSlice = AnalyzeState & AnalyzeActions;

const initialState = {
  options: null,
  analyzeRequest: {
    source: [],
    work_type: [],
    address: [],
    unom: [],
    longitude: [],
    latitude: [],
    start_time: '',
    end_time: '',
  },
  result: null,
};

export const createAnalyzeSlice: StateCreator<AnalyzeSlice> = (set) => ({
  ...initialState,
  setOptions: (data) =>
    set(
      produce((state) => {
        state.options = data;
      })
    ),
  setResult: (data) =>
    set(
      produce((state) => {
        state.result = data;
      })
    ),
});

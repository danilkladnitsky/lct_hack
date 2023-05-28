import { StateCreator } from 'zustand';
import { produce } from 'immer';
import MOCKED_RESPONSE from 'mocked/analysis.json';
import MOCKED_OPTIONS from 'mocked/options.json';
import { AnalyzeOptions } from 'types/analyze';
import { ResultRequest, ResultResponse } from 'types/core';

type AnalyzeState = {
  options: AnalyzeOptions | null;
  analyzeRequest: ResultRequest;
  analyzeResponse: ResultResponse | null;
};

type AnalyzeActions = {
  setOptions: (data: AnalyzeOptions) => void;
  setResult: (data: ResultResponse) => void;
  updateRequest: (data: Partial<ResultRequest>) => void;
  setAnalyzeResponse: (data: ResultResponse) => void;
  pickAddress: (unom: Unom) => void;
};

export type AnalyzeSlice = AnalyzeState & AnalyzeActions;

const initialState = {
  options: MOCKED_OPTIONS,
  analyzeRequest: {
    source: [],
    work_type: [],
    unom: [],
    start_time: '',
    end_time: '',
  },
  analyzeResponse: null
};

export const createAnalyzeSlice: StateCreator<AnalyzeSlice> = (set, state) => ({
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
  updateRequest: (data) => {
    const { analyzeRequest } = state();
    const updated = { ...analyzeRequest, ...data };

    set({ analyzeRequest: updated });
  },
  setAnalyzeResponse: (data) => {
    set({ analyzeResponse: data });
  },
  pickAddress: (unom) => {
    const { analyzeRequest } = state();
    const address = analyzeRequest.unom.includes(unom)
      ? analyzeRequest.unom.filter(a => a !== unom)
      : [...analyzeRequest.unom, unom];

    const updatedRequest = {
      ...analyzeRequest,
      unom: address
    };

    set({ analyzeRequest: updatedRequest });
  }
});

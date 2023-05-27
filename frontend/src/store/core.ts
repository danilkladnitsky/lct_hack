import { StateCreator } from "zustand";
import { produce } from "immer";
import { GetOptionsResponse, ResultRequest, ResultResponse } from "types/core";

type EbaloPsa = () => void;

type CoreState = {
  options: GetOptionsResponse | null;
  queryParams: ResultRequest;
  result: ResultResponse | null;
};

type CoreActions = {
  setOptions: (data: GetOptionsResponse) => void;
  setResult: (data: ResultResponse) => void;
};

export type CoreSlice = CoreState & CoreActions;

const initialState = {
  options: null,
  queryParams: {
    source: [],
    work_type: [],
    address: [],
    unom: [],
    longitude: [],
    latitude: [],
    start_time: "",
    end_time: "",
  },
  result: null,
};

export const createCoreSlice: StateCreator<CoreSlice> = (set) => ({
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

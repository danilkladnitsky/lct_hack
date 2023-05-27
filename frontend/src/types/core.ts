export type GetOptionsResponse = {
  source: string[];
  work_type: string[];
  address: string[];
  unom: number[];
  longitude: number[];
  latitude: number[];
};

export type ResultRequest = GetOptionsResponse & {
  start_time: string;
  end_time: string;
};

export type ResultResponse = {
  work: string[];
  unom: number[];
};

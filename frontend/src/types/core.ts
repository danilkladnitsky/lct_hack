import { SourceType } from './analyze';

export type ResultRequest = {
  start_date: string;
  end_date: string;
  work_type: string[];
  unom: Unom[];
  source: SourceType[];
};

export type ResultResponse = {
  work: string[];
  unom: number[];
  latitude: Latitude;
  longitude: Longitude;
  address: string;
}[];

export type ResultHistory = {
  id: number;
  request: ResultRequest;
  response: ResultResponse;
}

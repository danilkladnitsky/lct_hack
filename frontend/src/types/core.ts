import { SourceType } from './analyze';

export type ResultRequest = {
  start_time: string;
  end_time: string;
  work_type: string[];
  address: Unom[];
  source: SourceType[];
};

export type ResultResponse = {
  work: string[];
  unom: number[];
  latitude: Latitude;
  longitude: Longitude;
  address: string;
}[];

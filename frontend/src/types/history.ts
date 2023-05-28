
import { ResultRequest } from './core';

export type HistoryRecord = {
    login: string;
    created_at: string;
    request: ResultRequest;
    response: {
        address: string;
        unom: Unom;
        latitude: Latitude;
        longitude: Longitude;
        work_type: string[];
    }
}

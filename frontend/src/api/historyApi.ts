import { API_ROUTES } from 'constants/ApiRoutes';
import { HistoryRecord } from 'types/history';

import { api } from './api';

export default class HistoryApi {
    static getHistoryRecords = () => {
      return api.get<HistoryRecord[]>(API_ROUTES.HISTORY.GET_HISTORY);
    };
}

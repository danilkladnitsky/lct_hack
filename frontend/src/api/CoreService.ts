import { API_ROUTES } from 'constants/ApiRoutes';
import { AnalyzeOptions } from 'types/analyze';
import { ResultRequest, ResultResponse } from 'types/core';

import { api } from './api';

export default class AnalyzeService {
  static getOptions = () => {
    return api.get<AnalyzeOptions>(API_ROUTES.analyze.options);
  };

  static mlPrediction = (data: ResultRequest) => {
    return api.post<ResultResponse>(API_ROUTES.analyze.result, data);
  };
}

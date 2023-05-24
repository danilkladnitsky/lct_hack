import { API_ROUTES } from 'constants/ApiRoutes';

import { api } from './api';

export default class AuthService {
  static login = (data: any) => {
    return api.post<any>(API_ROUTES.auth.login, data);
  }

  static logout = (data: any) => {
    return api.post<any>(API_ROUTES.auth.logout, data);
  }

  static register = (data: any) => {
    return api.post<any>(API_ROUTES.auth.register, data);
  }

  static questions = () => {
    return api.get<any>(API_ROUTES.auth.questions);
  }
}

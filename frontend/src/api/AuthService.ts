import { API_ROUTES } from 'constants/ApiRoutes';

import { api } from './api';

export default class AuthService {
  static info = () => {
    return api.get<any>(API_ROUTES.auth.info);
  };

  static logout = () => {
    return api.get<any>(API_ROUTES.auth.logout);
  };

  static login = (data: any) => {
    return api.post<any>(API_ROUTES.auth.login, data);
  };

  static register = (data: any) => {
    return api.post<any>(API_ROUTES.auth.register, data);
  };

}

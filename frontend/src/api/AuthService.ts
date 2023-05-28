import { API_ROUTES } from 'constants/ApiRoutes';
import {
  InfoResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from 'types/auth';

import { api } from './api';

export default class AuthService {
  static info = () => {
    return api.get<InfoResponse>(API_ROUTES.auth.info);
  };

  static logout = () => {
    return api.get<LogoutResponse>(API_ROUTES.auth.logout);
  };

  static login = (data: LoginRequest) => {
    return api.post<LoginResponse>(API_ROUTES.auth.login, data);
  };

  static register = (data: RegisterRequest) => {
    return api.post<RegisterResponse>(API_ROUTES.auth.register, data);
  };
}

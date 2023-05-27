export type InfoResponse = {
  login?: string;
  isLogined: boolean;
};

export type LogoutResponse = InfoResponse;

export type LoginRequest = {
  login: string;
  password: string;
};

export type LoginResponse = InfoResponse;

export type RegisterRequest = LoginRequest;

export type RegisterResponse = InfoResponse;

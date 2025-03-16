export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface RegisterResponse {
  register: User;
}

export interface LoginResponse {
  login: {
    user: User;
    token: string;
  };
}

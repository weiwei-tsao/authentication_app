export interface RegisterInput {
  email: string;
  password: string;
  username: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl: string;
  isActive: boolean;
  isVerified: boolean;
  lastLogin: string;
  lastPasswordChange: string;
  createdAt: string;
  updatedAt: string;
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

import { JwtPayload } from 'jsonwebtoken';

export type User = {
  username: string;
  email: string;
  password: string;
};

export type Decode = string &
  JwtPayload & {
    userId: string;
    iat: number;
    exp: number;
  };

export type UserSelect = {
  id?: boolean;
  username?: boolean;
  email?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  refreshToken?: boolean;
};

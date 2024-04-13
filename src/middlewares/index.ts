import { Decode } from '@/types/costum';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Middleware for verify JWT before access the route
export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as Decode;

    req.user = decoded.username;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(403).send(error);
  }
};

// Middleware for protect /login and /register route when user already sign in
export const isLogin = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies?.jwt;

  if (refreshToken) {
    return res.sendStatus(403);
  }

  return next();
};

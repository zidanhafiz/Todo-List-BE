import { findByRefreshToken } from '@/model/userModel';
import { Decode } from '@/types/costum';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { rateLimit } from 'express-rate-limit';

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

    req.user = decoded.userId;

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

// Middleware for protect /user/:id routes when is not author of user
export const isAuthorUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) return res.sendStatus(401);

  // Check user is it match with database
  const user = await findByRefreshToken(refreshToken);

  if (!user) return res.sendStatus(401);

  // Check if user's id is not equal to request id
  if (user.id !== id) return res.sendStatus(401);

  return next();
};

// Middleware for check is user logined and is user exist on database (authentication) and protect all routes.
export const isAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) return res.sendStatus(401);

  // Check user is it match with database
  const user = await findByRefreshToken(refreshToken);

  if (!user) return res.sendStatus(401);

  return next();
};

// Middleware for limit login request
export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  limit: 3, // Limit each IP to 3 requests per `window` (here, per 1 minutes)
  message: {
    message:
      'Too many login attempts from this IP! Please try again after a 60 second pause',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

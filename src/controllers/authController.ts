import bcrypt from 'bcrypt';
import { findByEmail, findMany, updateRefreshToken } from '@model/userModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Decode } from '@/types/costum';

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // If email or password are empty field
  if (!email || !password)
    return res.status(400).send({
      message: 'Some fields are missing!',
    });

  try {
    // Find the user in the database
    const foundUser = await findByEmail(email);

    if (!foundUser)
      return res.status(400).send({
        message: 'Wrong email!',
      });

    // Matching the password
    const match = await bcrypt.compare(password, foundUser.password);

    if (!match)
      return res.status(400).send({
        message: 'Wrong password!',
      });

    // Create JWTs
    const refreshToken = jwt.sign(
      { userId: foundUser.id },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: '1d' }
    );
    const accessToken = jwt.sign(
      { userId: foundUser.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '15m' }
    );

    // Insert refresh token into database
    await updateRefreshToken(foundUser.id, refreshToken);

    // Insert refresh token into cookies with http only
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send access token to client
    return res.status(201).send({
      message: 'Success login!',
      access_token: accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: error,
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  // Get refresh token from cookies
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) return res.sendStatus(401);

  try {
    // Get all users and check if refresh token is match
    const users = await findMany({ refreshToken: true });
    const userExist = users.find((user) => user.refreshToken === refreshToken);

    if (!userExist)
      return res.status(400).send({
        message: 'Invalid refresh token',
      });

    // Verify JWTs
    jwt.verify(
      refreshToken as string,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err, d) => {
        const decoded = d as Decode;
        // Check if error or username is not match with refresh token's payload
        if (err || decoded.userId !== userExist.id) return res.sendStatus(403);

        // Generate new access token
        const accessToken = jwt.sign(
          { userId: userExist.id },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: '15m' }
        );

        return res.status(200).send({
          message: 'Succes generate new access token',
          access_token: accessToken,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  // Get refresh token from cookies
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) return res.sendStatus(204);

  try {
    // Get all users and check if refresh token is match
    const users = await findMany({ refreshToken: true });
    const userExist = users.find((user) => user.refreshToken === refreshToken);

    // If refresh token does not found in database clear the cookies
    if (!userExist) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
      return res.sendStatus(204);
    }

    // If refresh token is found in database clear the refresh token in database
    await updateRefreshToken(userExist.id, null);

    // Clear cookies
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

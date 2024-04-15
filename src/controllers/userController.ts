import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {
  createData,
  deleteById,
  findById,
  findMany,
  updateUsername,
} from '@model/userModel';

export const createUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  // Check if email, username or password are empty
  if (!email || !username || !password)
    return res.status(400).send({ message: 'Some fields are missing!' });

  try {
    // Get users and check if username or email already used
    const users = await findMany();
    const usernameExist = users.find((user) => user.username === username);
    const emailExist = users.find((user) => user.email === email);

    if (usernameExist) {
      return res.status(400).send({ message: 'Username already exist!' });
    } else if (emailExist) {
      return res.status(400).send({ message: 'Email already exist!' });
    }

    // Hash password and send into database
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      username,
      password: hashPassword,
    };

    // Insert new user into database
    const createdUser = await createData(newUser);

    return res.status(201).send({
      message: 'Success create user!',
      data: createdUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      messsage: error,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findMany();

    return res.status(200).send(users);
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      message: error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await findById(id);

    if (!user) return res.status(404).send({ message: `User with id:${id} not found!` });

    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      message: error,
    });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) return res.status(400).send({ message: 'Username required!' });

    const updatedUser = await updateUsername(id, username);

    return res.status(201).send({
      message: 'User updated!',
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      message: error,
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete user data in database
    await deleteById(id);

    // Clear JWT refresh token in cookie
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });

    return res.status(201).send({
      message: 'Success deleted!',
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      message: error,
    });
  }
};

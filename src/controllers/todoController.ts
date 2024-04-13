import { findMany } from '@/model/todoModel';
import { Request, Response } from 'express';

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await findMany();

    return res.status(200).send(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: error,
    });
  }
};

import { deleteData, findById, findMany, insertData, updateData } from '@model/todoModel';
import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

export const createTodo = async (req: Request, res: Response) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) return res.status(400).send(result.array());

    const { title, description, finished } = matchedData(req);

    if (!req.user) return res.sendStatus(401);

    const userId = req.user;

    const data = {
      title,
      description,
      finished,
    };

    await insertData(data, userId);

    return res.status(201).send({
      message: 'Success created new todo!',
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      message: error,
    });
  }
};

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await findMany();

    return res.status(200).send(todos);
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      message: error,
    });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const todo = await findById(id);

    if (!todo) return res.status(404).send({ message: 'Todo not found!' });

    return res.status(200).send(todo);
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      message: error,
    });
  }
};

export const updateTodoById = async (req: Request, res: Response) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) return res.status(401).send(result.array());

    const { id, title, description, finished } = matchedData(req);

    const data = {
      title,
      description,
      finished,
    };

    await updateData(id, data);

    return res.status(201).send({
      message: 'Success updated todo!',
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      message: error,
    });
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);

    await deleteData(id);

    return res.status(201).send({
      message: 'Success delete todo!',
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      message: error,
    });
  }
};

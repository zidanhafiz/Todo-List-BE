import { isAuthorTodo } from '@/middlewares';
import {
  createTodoValidator,
  todoParamsValidator,
  updateTodoValidator,
} from '@/middlewares/todoValidator';
import { upload } from '@/utils';
import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  updateTodoById,
} from '@controllers/todoController';
import { Router } from 'express';

const router = Router();

router.route('/').get(getAllTodos).post(upload.none(), createTodoValidator, createTodo);

router
  .route('/:id')
  .get(todoParamsValidator, getTodoById)
  .patch(isAuthorTodo, updateTodoValidator, updateTodoById)
  .delete(isAuthorTodo, todoParamsValidator, deleteTodoById);

export default router;

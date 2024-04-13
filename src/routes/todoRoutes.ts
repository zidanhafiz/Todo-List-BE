import { getAllTodos } from '@/controllers/todoController';
import { Router } from 'express';

const router = Router();

router.get('/', getAllTodos);

export default router;

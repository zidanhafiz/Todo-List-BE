import { isAuthorUser } from '@/middlewares';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '@controllers/userController';
import { Router } from 'express';

const router = Router();

router.get('/', getAllUsers);

router
  .route('/:id')
  .get(getUserById)
  .patch(isAuthorUser, updateUserById)
  .delete(isAuthorUser, deleteUserById);

export default router;

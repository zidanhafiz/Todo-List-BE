import { isAuthorUser } from '@/middlewares';
import { updateUserValidator } from '@/middlewares/userValidator';
import { upload } from '@/utils';
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
  .patch(isAuthorUser, upload.none(), updateUserValidator, updateUserById)
  .delete(isAuthorUser, deleteUserById);

export default router;

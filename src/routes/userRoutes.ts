import { verifyJWT } from '@/middlewares';
import { getAllUsers } from '@controllers/userController';
import { Router } from 'express';

const router = Router();

router.get('/', verifyJWT, getAllUsers);

export default router;

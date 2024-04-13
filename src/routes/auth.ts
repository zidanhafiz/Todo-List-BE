import { handleLogin, handleLogout, refreshToken } from '@controllers/authController';
import { upload } from '@/utils';
import { createUser } from '@controllers/userController';
import { Router } from 'express';
import { isLogin } from '@/middlewares';

const router = Router();

router.post('/register', isLogin, upload.none(), createUser);
router.post('/login', isLogin, upload.none(), handleLogin);

router.get('/refresh', refreshToken);
router.get('/logout', handleLogout);

export default router;

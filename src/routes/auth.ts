import { handleLogin, handleLogout, refreshToken } from '@controllers/authController';
import { upload } from '@/utils';
import { createUser } from '@controllers/userController';
import { Router } from 'express';
import { isLogin, loginLimiter } from '@/middlewares';
import { loginValidator, registerValidator } from '@/middlewares/authValidator';

const router = Router();

router.post('/register', isLogin, upload.none(), registerValidator, createUser);
router.post('/login', isLogin, loginLimiter, upload.none(), loginValidator, handleLogin);

router.get('/refresh', refreshToken);
router.get('/logout', handleLogout);

export default router;

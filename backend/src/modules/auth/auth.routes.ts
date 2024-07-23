import { Router } from 'express';

import { validateDto } from '~/middlewares';
import { LoginDto, RegisterDto } from './dtos';
import authController from './auth.controller';

const router = Router();

router.post('/login', validateDto(LoginDto), authController.login);
router.post('/register', validateDto(RegisterDto), authController.register);

export default router;

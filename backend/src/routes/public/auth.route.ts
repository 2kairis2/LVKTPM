import express from 'express';
const router = express.Router();

import authControl from '~/controllers/auth.controller';
import { CreateUserDto, LoginUserDto } from '~/dtos';
import { validationMiddleware } from '~/middlewares/validation';

router.route('/register').post(validationMiddleware(CreateUserDto), authControl.register);
router.route('/login').post(validationMiddleware(LoginUserDto), authControl.login);

export default router;

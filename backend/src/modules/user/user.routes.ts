import { Router } from 'express';

import { validatePermission, validateDto, authorization } from '~/middlewares';
import { IPermission } from '~/types';
import { CreateUserDto, UpdateUserDto } from './dtos';
import userController from './user.controller';

const router = Router();

router.post('/', validateDto(CreateUserDto), validatePermission(IPermission.CREATE_USER), userController.createUser);
router.get('/', validatePermission(IPermission.READ_USER), userController.getUser);
router.get('/info/:id', validatePermission(IPermission.READ_USER), userController.getUserById);
router.get('/me', authorization, userController.getMe);
router.put('/:id', validateDto(UpdateUserDto), validatePermission(IPermission.UPDATE_USER), userController.updateUser);

export default router;

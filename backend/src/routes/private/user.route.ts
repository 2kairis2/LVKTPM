import express from 'express';
const router = express.Router();

import userController from '~/controllers/user.controller';
import { authentication } from '~/middlewares/guard';
import { IPermission } from '~/types';

router.patch('/:id', authentication(IPermission.UPDATE_USER), userController.updateUserById);
router.patch('/:id/change-password', userController.changePassword);
router.get('/id/:id', authentication(IPermission.READ_USER), userController.getUserById);
router.get('/me', userController.getMe);
router.get('/', authentication(IPermission.READ_USER), userController.getUsers);

export default router;

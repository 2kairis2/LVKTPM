import express from 'express';
const router = express.Router();

import roleController from '~/controllers/role.controller';
import { CreateUpdateRoleDto } from '~/dtos';
import { authentication } from '~/middlewares/guard';
import { validationMiddleware } from '~/middlewares/validation';
import { IPermission } from '~/types';

router.get('/:id', authentication(IPermission.READ_ROLE), roleController.getRoleById);
router.get('/', authentication(IPermission.READ_ROLE), roleController.getRoles);
router.post(
    '/',
    authentication(IPermission.CREATE_ROLE),
    validationMiddleware(CreateUpdateRoleDto),
    roleController.createRole,
);
router.patch(
    '/:id',
    authentication(IPermission.UPDATE_ROLE),
    validationMiddleware(CreateUpdateRoleDto),
    roleController.updateRole,
);
router.delete('/:id', authentication(IPermission.DELETE_ROLE), roleController.deleteRole);

export default router;

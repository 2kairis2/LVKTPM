import { Router } from 'express';

import { validatePermission, validateDto } from '~/middlewares';
import { IPermission } from '~/types';
import { CreateRoleDto, UpdateRoleDto } from './dtos';
import roleController from './role.controller';

const router = Router();

router.post('/', validateDto(CreateRoleDto), validatePermission(IPermission.CREATE_ROLE), roleController.createRole);
router.get('/', validatePermission(IPermission.READ_ROLE), roleController.getRole);
router.get('/info/:id', validatePermission(IPermission.READ_ROLE), roleController.getRoleById);
router.put('/:id', validateDto(UpdateRoleDto), validatePermission(IPermission.UPDATE_ROLE), roleController.updateRole);
router.delete('/:id', validatePermission(IPermission.DELETE_ROLE), roleController.deleteRole);

export default router;

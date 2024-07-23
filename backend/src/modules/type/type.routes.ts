import { Router } from 'express';

import { validatePermission, validateDto } from '~/middlewares';
import { IPermission } from '~/types';
import { CreateTypeDto, UpdateTypeDto } from './dtos';
import typeController from './type.controller';

const router = Router();

router.post('/', validateDto(CreateTypeDto), validatePermission(IPermission.CREATE_TYPE), typeController.createType);
router.get('/', validatePermission(IPermission.READ_TYPE), typeController.getType);
router.get('/info/:id', validatePermission(IPermission.READ_TYPE), typeController.getTypeById);
router.put('/:id', validateDto(UpdateTypeDto), validatePermission(IPermission.UPDATE_TYPE), typeController.updateType);
router.delete('/:id', validatePermission(IPermission.DELETE_TYPE), typeController.deleteType);

export default router;

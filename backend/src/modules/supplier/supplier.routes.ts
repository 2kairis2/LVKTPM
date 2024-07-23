import { Router } from 'express';

import { validatePermission, validateDto } from '~/middlewares';
import { IPermission } from '~/types';
import { CreateSupplierDto, UpdateSupplierDto } from './dtos';
import supplierController from './supplier.controller';

const router = Router();

router.post(
    '/',
    validateDto(CreateSupplierDto),
    validatePermission(IPermission.CREATE_SUPPLIER),
    supplierController.createSupplier,
);
router.get('/', validatePermission(IPermission.READ_SUPPLIER), supplierController.getSupplier);
router.get('/info/:id', validatePermission(IPermission.READ_SUPPLIER), supplierController.getSupplierById);
router.put(
    '/:id',
    validateDto(UpdateSupplierDto),
    validatePermission(IPermission.UPDATE_SUPPLIER),
    supplierController.updateSupplier,
);
router.delete('/:id', validatePermission(IPermission.DELETE_SUPPLIER), supplierController.deleteSupplier);

export default router;

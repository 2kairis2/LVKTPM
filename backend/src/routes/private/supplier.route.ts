import express from 'express';
const router = express.Router();

import supplierController from '~/controllers/supplier.controller';
import { CreateUpdateSupplierDto } from '~/dtos';
import { authentication } from '~/middlewares/guard';
import { validationMiddleware } from '~/middlewares/validation';
import { IPermission } from '~/types';

router.get('/:id', authentication(IPermission.READ_SUPPLIER), supplierController.getSupplierById);
router.get('/', authentication(IPermission.READ_SUPPLIER), supplierController.getSuppliers);
router.post(
    '/',
    authentication(IPermission.CREATE_SUPPLIER),
    validationMiddleware(CreateUpdateSupplierDto),
    supplierController.createSupplier,
);
router.patch(
    '/:id',
    authentication(IPermission.UPDATE_ROLE),
    validationMiddleware(CreateUpdateSupplierDto),
    supplierController.updateSupplier,
);
router.delete('/:id', authentication(IPermission.DELETE_ROLE), supplierController.deleteSupplier);

export default router;

import { Router } from 'express';

import { validatePermission, validateDto } from '~/middlewares';
import { IPermission } from '~/types';
import { CreateInventoryReceiptDto, UpdateInventoryReceiptDto } from './dtos';
import inventoryReceiptController from './inventory-receipt.controller';

const router = Router();

router.post(
    '/',
    validateDto(CreateInventoryReceiptDto),
    validatePermission(IPermission.CREATE_INVENTORY_RECEIPT),
    inventoryReceiptController.createInventoryReceipt,
);
router.get('/', validatePermission(IPermission.READ_INVENTORY_RECEIPT), inventoryReceiptController.getInventoryReceipt);
router.get(
    '/info/:id',
    validatePermission(IPermission.READ_INVENTORY_RECEIPT),
    inventoryReceiptController.getInventoryReceiptById,
);
router.put(
    '/:id',
    validateDto(UpdateInventoryReceiptDto),
    validatePermission(IPermission.UPDATE_INVENTORY_RECEIPT),
    inventoryReceiptController.updateInventoryReceipt,
);
router.delete(
    '/:id',
    validatePermission(IPermission.DELETE_INVENTORY_RECEIPT),
    inventoryReceiptController.deleteInventoryReceipt,
);

export default router;

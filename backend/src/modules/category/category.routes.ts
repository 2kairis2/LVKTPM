import { Router } from 'express';

import { validatePermission, validateDto } from '~/middlewares';
import { IPermission } from '~/types';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import categoryController from './category.controller';

const router = Router();

router.post(
    '/',
    validateDto(CreateCategoryDto),
    validatePermission(IPermission.CREATE_CATEGORY),
    categoryController.createCategory,
);
router.get('/', validatePermission(IPermission.READ_CATEGORY), categoryController.getCategory);
router.get('/info/:id', validatePermission(IPermission.READ_CATEGORY), categoryController.getCategoryById);
router.put(
    '/:id',
    validateDto(UpdateCategoryDto),
    validatePermission(IPermission.UPDATE_CATEGORY),
    categoryController.updateCategory,
);
router.delete('/:id', validatePermission(IPermission.DELETE_CATEGORY), categoryController.deleteCategory);

export default router;

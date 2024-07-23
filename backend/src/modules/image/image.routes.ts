import { Router } from 'express';

import { validatePermission, validateDto, uploadMultiple } from '~/middlewares';
import { IPermission } from '~/types';
import { CreateImageDto, UpdateImageDto } from './dtos';
import imageController from './image.controller';

const router = Router();

router.post(
    '/',
    validateDto(CreateImageDto),
    validatePermission(IPermission.CREATE_IMAGE),
    uploadMultiple,
    imageController.createImage,
);
router.get('/', validatePermission(IPermission.READ_IMAGE), imageController.getImage);
router.get('/info/:id', validatePermission(IPermission.READ_IMAGE), imageController.getImageById);
router.get('/un-used', validatePermission(IPermission.READ_IMAGE), imageController.findImageUnUsed);
router.put(
    '/:id',
    validateDto(UpdateImageDto),
    validatePermission(IPermission.UPDATE_IMAGE),
    uploadMultiple,
    imageController.updateImage,
);
router.delete('/', validatePermission(IPermission.DELETE_IMAGE), imageController.deleteImage);

export default router;

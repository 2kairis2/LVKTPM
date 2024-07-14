import express from 'express';
const router = express.Router();

import imageController from '~/controllers/image.controller';
import { authentication } from '~/middlewares/guard';
import upload from '~/middlewares/multer';
import { IPermission } from '~/types';

router.get('/:id', authentication(IPermission.READ_IMAGE), imageController.getImageById);
router.get('/', authentication(IPermission.READ_IMAGE), imageController.getImages);
router.post('/', authentication(IPermission.CREATE_IMAGE), upload.single('image'), imageController.uploadImage);
router.patch('/:id', authentication(IPermission.UPDATE_IMAGE), upload.single('image'), imageController.updateImage);
router.delete('/', authentication(IPermission.DELETE_IMAGE), imageController.deleteImage);

export default router;

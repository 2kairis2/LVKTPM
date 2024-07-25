import { Request, Response } from 'express';
import fs from 'fs';

import { handleError, responseWithData, getQueriesPaginate, responseWithPagination } from '~/helper';
import imageService from './image.service';
import { HttpStatus } from '~/types';

const imageController = {
    createImage: async (req: Request, res: Response) => {
        try {
            const images = req.files as Express.Multer.File[];

            if (!images) {
                return handleError(
                    { message: 'Vui lòng tải lên ít nhất một ảnh', status: HttpStatus.BAD_REQUEST },
                    res,
                );
            }
            const result = [];
            for (const image of images) {
                const newImage = await imageService.createImage({
                    name: image.filename,
                    url: `${process.env.BASE_URL}${image.path.replace(/\\/g, '/').replace('public', '')}`,
                });
                result.push(newImage);
            }
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    getImage: async (req: Request, res: Response) => {
        try {
            const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query, 'IMAGE');

            const result = await imageService.getImage({
                limit,
                query,
                sort,
                skip,
                includes,
            });
            const total = await imageService.countDocuments(query);

            return responseWithPagination({ res, data: result, total, page, limit });
        } catch (error) {
            handleError(error, res);
        }
    },

    getImageById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { includes } = req.query;

            const result = await imageService.getImageById(id, includes as string | Array<string>);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    updateImage: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const result = await imageService.updateImage(id, data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    deleteImage: async (req: Request, res: Response) => {
        try {
            const { ids } = req.body;
            const result = [];
            for (const id of ids) {
                const image = await imageService.deleteImage(id);
                if (!image) {
                    continue;
                }
                removeImage(image);
                result.push(image);
            }
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    findImageUnUsed: async (req: Request, res: Response) => {
        try {
            const result = await imageService.findUnUsedImages();
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
};

function removeImage(image: { name: string; url: string }) {
    const baseUrl = process.env.BASE_URL || '';
    const path = 'public' + image.url.replace(baseUrl, '');

    fs.unlink(path, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('🚀 ~ file: file deleted ', image.name);
    });
}

export default imageController;

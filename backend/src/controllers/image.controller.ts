import { Request, Response } from 'express';
import { convertDataResponse, convertError, convertPaginateResponse, getQueriesPaginate } from '~/helper';
import Image from '~/models/image';

const imageController = {
    uploadImage: async (req: Request, res: Response) => {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).send('Vui lòng nhập file');
            }

            const newImage = new Image({
                name: file.filename,
                path: file.path.replace(/\\/g, '/'),
            });

            await newImage.save();
            res.status(201).json(convertDataResponse(newImage, 'Tải hình ảnh thành công'));
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: convertError(error),
            });
        }
    },
    getImages: async (req: Request, res: Response) => {
        try {
            const { limit, page, query, skip, sort } = getQueriesPaginate(req.query, 'IMAGE');
            const images = await Image.find(query).skip(skip).limit(limit).sort(sort);

            const paginateData = await convertPaginateResponse({
                model: Image,
                data: images,
                query,
                page,
                limit,
            });

            res.status(200).json(paginateData);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: convertError(error),
            });
        }
    },
    getImageById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const image = await Image.findById(id);
            if (!image) {
                return res.status(404).json({
                    message: 'Không tìm thấy hình ảnh',
                });
            }
            res.status(200).json(convertDataResponse(image));
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: convertError(error),
            });
        }
    },
    deleteImage: async (req: Request, res: Response) => {
        try {
            const { ids } = req.body;
            const image = await Image.deleteMany({ _id: { $in: ids } });
            if (!image) {
                return res.status(404).json({
                    message: 'Không tìm thấy hình ảnh',
                });
            }

            res.status(200).json(convertDataResponse(image, 'Xóa hình ảnh thành công'));
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: convertError(error),
            });
        }
    },
    updateImage: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const image = await Image.findByIdAndUpdate(
                id,
                {
                    name,
                },
                {
                    new: true,
                },
            );
            res.status(200).json(convertDataResponse(image, 'Cập nhật hình ảnh thành công'));
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: convertError(error),
            });
        }
    },
};

export default imageController;

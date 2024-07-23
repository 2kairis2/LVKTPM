import Image from './image.model';
import { CustomError } from '~/helper';
import { HttpStatus } from '~/types';

const imageService = {
    createImage: async (data: any) => {
        const image = new Image(data);
        return image.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await Image.countDocuments(query);
        return count;
    },
    getImage: async ({
        limit = 10,
        sort = '-createdAt',
        skip = 0,
        query = {},
        includes = '',
    }: {
        limit?: number;
        sort?: string | Record<string, any>;
        skip?: number;
        query?: Record<string, any>;
        includes?: string | Array<string>;
    }) => {
        const images = await Image.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

        return images;
    },

    getImageById: async (id: string, includes: string | Array<string> = '') => {
        const image = await Image.findById(id).populate(includes);
        return image;
    },

    updateImage: async (id: string, data: any) => {
        const image = await Image.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!image) {
            throw new CustomError('Image không tồn tại', HttpStatus.NOT_FOUND);
        }

        return image;
    },

    deleteImage: async (id: string) => {
        const image = await Image.findByIdAndDelete(id);

        if (!image) {
            throw new CustomError('Image không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return image;
    },

    findUnUsedImages: async () => {
        const images = await Image.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'images',
                    as: 'product',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'avatar',
                    as: 'user',
                },
            },
            {
                $match: {
                    product: {
                        $size: 0,
                    },
                    user: {
                        $size: 0,
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    url: 1,
                },
            },
        ]);
        return images;
    },
};

export default imageService;

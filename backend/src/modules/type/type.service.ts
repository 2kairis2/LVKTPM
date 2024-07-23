import Type from './type.model';
import { areUniqueValues, CustomError } from '~/helper';
import { HttpStatus, IType } from '~/types';

const typeService = {
    createType: async (data: IType) => {
        const uniqueValue = await areUniqueValues(Type, {
            title: data.title,
            slug: data.slug,
        });

        if (uniqueValue.title) {
            throw new CustomError('Title đã tồn tại', HttpStatus.BAD_REQUEST);
        }

        if (uniqueValue.slug) {
            throw new CustomError('Slug đã tồn tại', HttpStatus.BAD_REQUEST);
        }

        const type = new Type(data);
        return type.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await Type.countDocuments(query);
        return count;
    },
    getType: async ({
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
        const types = await Type.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

        return types;
    },

    getTypeById: async (id: string, includes: string | Array<string> = '') => {
        const type = await Type.findById(id).populate(includes);

        if (!type) {
            throw new CustomError('Type không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return type;
    },

    updateType: async (id: string, data: IType) => {
        const type = await Type.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!type) {
            throw new CustomError('Type không tồn tại', HttpStatus.NOT_FOUND);
        }

        return type;
    },

    deleteType: async (id: string) => {
        const type = await Type.findByIdAndDelete(id);

        if (!type) {
            throw new CustomError('Type không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return type;
    },
};

export default typeService;

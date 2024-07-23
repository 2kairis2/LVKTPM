import Category from './category.model';
import { areUniqueValues, CustomError } from '~/helper';
import { HttpStatus, ICategory } from '~/types';

const categoryService = {
    createCategory: async (data: ICategory) => {
        const uniqueValue = await areUniqueValues(Category, {
            title: data.title,
            slug: data.slug,
        });

        if (uniqueValue.title) {
            throw new CustomError('Title đã tồn tại', HttpStatus.BAD_REQUEST);
        }

        if (uniqueValue.slug) {
            throw new CustomError('Slug đã tồn tại', HttpStatus.BAD_REQUEST);
        }

        const category = new Category(data);
        return category.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await Category.countDocuments(query);
        return count;
    },
    getCategory: async ({
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
        const categories = await Category.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

        return categories;
    },
    getCategoryById: async (id: string, includes: string | Array<string> = '') => {
        const category = await Category.findById(id).populate(includes);

        if (!category) {
            throw new CustomError('Category không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return category;
    },
    updateCategory: async (id: string, data: ICategory) => {
        const category = await Category.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!category) {
            throw new CustomError('Category không tồn tại', HttpStatus.NOT_FOUND);
        }

        return category;
    },
    deleteCategory: async (id: string) => {
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            throw new CustomError('Category không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return category;
    },
};

export default categoryService;

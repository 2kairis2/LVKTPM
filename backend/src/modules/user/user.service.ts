import bcrypt from 'bcryptjs';

import { CustomError } from '~/helper';
import { HttpStatus } from '~/types';
import User from './user.model';

const userService = {
    createUser: async (data: any) => {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(data.password, salt);
        const user = new User({
            ...data,
            password: hashPassword,
        });
        return user.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await User.countDocuments(query);
        return count;
    },
    getUser: async ({
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
        const users = await User.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

        return users;
    },
    getUserById: async (id: string, includes: string | Array<string> = '') => {
        const user = await User.findById(id).populate(includes);
        return user;
    },
    updateUser: async (id: string, data: any) => {
        const user = await User.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!user) {
            throw new CustomError('User không tồn tại', HttpStatus.NOT_FOUND);
        }

        return user;
    },
};

export default userService;

import { areUniqueValues, CustomError } from '~/helper';
import Role from './role.model';
import { HttpStatus } from '~/types';

const roleService = {
    createRole: async (data: any) => {
        const uniqueValues = await areUniqueValues(Role, { name: data.name });

        if (uniqueValues.name) {
            throw new CustomError('Tên role đã tồn tại', HttpStatus.BAD_REQUEST);
        }

        const role = new Role(data);
        return role.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await Role.countDocuments(query);
        return count;
    },
    getRole: async ({
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
        const roles = await Role.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

        return roles;
    },

    getRoleById: async (id: string, includes: string | Array<string>) => {
        const role = await Role.findById(id).populate(includes);
        return role;
    },

    updateRole: async (id: string, data: any) => {
        const role = await Role.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!role) {
            throw new CustomError('Role không tồn tại', HttpStatus.NOT_FOUND);
        }

        return role;
    },

    deleteRole: async (id: string) => {
        const role = await Role.findByIdAndDelete(id);
        return role;
    },
};

export default roleService;

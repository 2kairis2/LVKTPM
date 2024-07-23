import bcrypt from 'bcryptjs';
import { CustomError } from '~/helper';
import userService from '~/modules/user/user.service';
import { HttpStatus } from '~/types';

const authService = {
    register: async (data: any) => {
        const user = await userService.createUser(data);
        return user;
    },
    login: async ({ email, password }: { email: string; password: string }) => {
        const user = await authService.invalidUser(email);

        if (!comparePassword(password, user[0].password)) {
            throw new CustomError('Sai mật khẩu', HttpStatus.BAD_REQUEST);
        }

        return user[0];
    },
    invalidUser: async (email: string) => {
        const user = await userService.getUser({ query: { email }, includes: ['role', 'avatar'] });

        if (user.length === 0) {
            throw new CustomError('Không tìm thấy người dùng', HttpStatus.NOT_FOUND);
        }

        return user;
    },
};

function comparePassword(password: string, hash: string) {
    const isMatch = bcrypt.compareSync(password, hash);
    return isMatch;
}

export default authService;

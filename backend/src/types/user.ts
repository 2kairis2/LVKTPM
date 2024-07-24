import { BaseProps, IRole, IImage, StringOrObjectId } from '~/types';

export interface IUser extends BaseProps {
    email: string;
    role: IRole;
    fullname: string;
    phone: string;
    address: string;
    status: number;
    password: string;
    avatar: StringOrObjectId | IImage;
}

export type UserToken = Pick<IUser, '_id' | 'email' | 'role'>;

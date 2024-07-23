import { IImage } from './image';
import { IRole } from './role';
import { CommonProps } from './common';

export interface IUser extends CommonProps {
    _id: string;
    email: string;
    role: IRole;
    fullname: string;
    phone: string;
    address: string;
    status: number;
    password: string;
    avatar: string | IImage;
}

export type UserToken = Pick<IUser, '_id' | 'email' | 'role'>;

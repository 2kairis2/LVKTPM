import { IRole } from './role';
import { CommonProps } from './common';

export interface IUser extends CommonProps {
    _id: string;
    email: string;
    role: IRole;
    full_name: string;
    phone: string;
    address: string;
}

export type UserToken = Pick<IUser, '_id' | 'email' | 'role'>;

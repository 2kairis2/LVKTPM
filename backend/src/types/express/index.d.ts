import { UserToken } from '../user';

declare global {
    namespace Express {
        export interface Request {
            user: UserToken;
            file: any;
        }
    }
}

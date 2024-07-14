export interface IRole {
    _id: string;
    name: string;
    desc: string;
    permissions: Array<number>;
}

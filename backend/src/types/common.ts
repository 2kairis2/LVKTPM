export interface CommonProps {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export interface RequestQuery {
    limit?: number;
    page?: number;
    sort?: string;
    includes?: string;
    file?: any;
}

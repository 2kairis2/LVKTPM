export function createSlug(str: string) {
    str = str.replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/Đ/g, 'D');
    str = str.normalize('NFD');
    str = str.replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/[^a-zA-Z0-9 ]/g, '');
    str = str.trim();
    str = str.toLocaleLowerCase().replace(/ +/g, '-');
    return str;
}

export const convertError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'Internal server error';
};

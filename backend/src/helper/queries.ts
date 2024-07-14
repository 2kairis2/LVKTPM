export const createQueries = (query: Record<string, any>, type: TypeQuery = 'PRODUCT') => {
    let filter = {};
    if (query.search && query.search.length > 0) {
        filter = {
            ...filter,
            $text: { $search: query.search },
        };
    }
    if (type === 'PRODUCT') {
        if (query.type) {
            filter = { ...filter, type: query.type };
        }
        if (query.feature) {
            filter = { ...filter, feature: query.feature };
        }
        if (query.slug) {
            filter = { ...filter, slug: query.slug };
        }
        if (query.price) {
            filter = { ...filter, price: query.price };
        }
        if (query.rp) {
            const range_price = query.rp.split(':');
            filter = {
                ...filter,
                price: {
                    $gte: +range_price[0],
                    $lte: +range_price[1],
                },
            };
        }
        if (query.weight) {
            filter = { ...filter, weight: query.weight };
        }
        if (query.rw) {
            const range_weight = query.rw.split(':');
            filter = {
                ...filter,
                weight: {
                    $gte: range_weight[0],
                    $lte: range_weight[1],
                },
            };
        }
        if (query.quantity) {
            filter = { ...filter, quantity: query.quantity };
        }
        if (query.quantityp) {
            filter = { ...filter, quantityp: query.quantityp };
        }
        if (query.exp) {
            filter = { ...filter, exp: query.exp };
        }
        if (query.mfg) {
            filter = { ...filter, mfg: query.mfg };
        }
    }

    if (type === 'SUPPLIER') {
        if (query.name) {
            filter = { ...filter, name: { $regex: query.name || '', $options: 'i' } };
        }
        if (query.address) {
            filter = { ...filter, address: { $regex: query.address || '', $options: 'i' } };
        }
        if (query.phone) {
            filter = { ...filter, phone: { $regex: query.phone || '', $options: 'i' } };
        }
        if (query.email) {
            filter = { ...filter, email: { $regex: query.email || '', $options: 'i' } };
        }
    }

    return filter;
};

export const convertSort = (query: Record<string, any>) => {
    let sort = {};

    if (query.sort) {
        sort = { [query.sort]: query?.order === 'asc' ? 1 : -1 };
    }

    return sort;
};

export const convertIncludes = (query: Record<string, any>) => {
    let includes: Array<string> = [];
    if (query.includes) {
        includes = query.includes.split(',');
    }
    return includes;
};

type TypeQuery = 'PRODUCT' | 'SUPPLIER' | 'CATEGORY' | 'ORDER' | 'USER';

export const getQueriesPaginate = (query: Record<string, any>, type: TypeQuery = 'PRODUCT') => {
    const { sort = 'createdAt', order = 'desc', limit = 10, page = 1, ...rest } = query;

    return {
        sort: convertSort({ sort, order }),
        limit: Number(limit),
        page: Number(page),
        skip: (Number(page) - 1) * Number(limit),
        includes: convertIncludes(query),
        query: createQueries(rest, type),
    };
};

import { QUERY } from '~/constants';

export const createQueries = (query: Record<string, any>) => {
    let filter = {};
    if (query.search && query.search.length > 0) {
        filter = {
            ...filter,
            $text: { $search: query.search },
        };
    }
    if (query.type) {
        filter = { ...filter, type: query.type };
    }
    if (query.feature) {
        filter = { ...filter, feature: query.feature };
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
    if (query.saleCount) {
        filter = { ...filter, saleCount: query.saleCount };
    }

    return filter;
};

export const convertSort = (query: Record<string, any>) => {
    let sort = {};
    if (query.sort) {
        const sortQuery = query.sort.split(':');
        if (!QUERY.SORT_VALUES.includes(sortQuery[1])) return sort;
        sort = { [sortQuery[0]]: sortQuery[1] };
    }
    return sort;
};

export const convertIncludes = (query: Record<string, any>) => {
    let includes = [];
    if (query.includes) {
        includes = query.includes.split(',');
    }
    return includes;
};

type TypeQuery = 'PRODUCT' | 'SUPPLIER' | 'ORDER' | 'USER' | 'IMAGE' | 'INVENTORY_RECEIPT' | 'PRODUCT_DETAIL' | 'CART';

export const createQueries = (query: Record<string, any>, type: TypeQuery = 'PRODUCT') => {
    let filter = {};
    if (query.search && query.search.length > 0) {
        filter = {
            ...filter,
            $text: { $search: query.search },
        };
    }
    if (query.status) {
        filter = { ...filter, status: query.status };
    }
    // range createdAt
    if (query.rc) {
        const range_date = query.rd.split(':');
        filter = {
            ...filter,
            createdAt: {
                $gte: new Date(range_date[0]),
                $lte: new Date(range_date[1]),
            },
        };
    }

    if (type === 'PRODUCT') {
        if (query.title) {
            filter = { ...filter, title: { $regex: query.title, $options: 'i' } };
        }
        if (query.slug) {
            filter = { ...filter, slug: query.slug };
        }
        if (query.rs) {
            const range_sale = query.rs.split(':');
            filter = {
                ...filter,
                sale: {
                    $gte: +range_sale[0],
                    $lte: +range_sale[1],
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
    }

    if (type === 'SUPPLIER') {
        if (query.name) {
            filter = { ...filter, name: { $regex: query.name, $options: 'i' } };
        }
        if (query.phone) {
            filter = { ...filter, phone: { $regex: query.phone, $options: 'i' } };
        }
        if (query.email) {
            filter = { ...filter, email: { $regex: query.email, $options: 'i' } };
        }
    }

    if (type === 'IMAGE') {
        // queries for image
    }

    if (type === 'ORDER') {
        // queries for order
    }

    if (type === 'USER') {
        // queries for user
    }

    if (type === 'INVENTORY_RECEIPT') {
        // range importedAt
        if (query.ri) {
            const range_imported = query.ri.split(':');
            filter = {
                ...filter,
                importedAt: {
                    $gte: new Date(range_imported[0]),
                    $lte: new Date(range_imported[1]),
                },
            };
        }
    }

    if (type === 'PRODUCT_DETAIL') {
        if (query.product) {
            filter = { ...filter, product: query.product };
        }
        if (query.receipt) {
            filter = { ...filter, receipt: query.receipt };
        }
        if (query.sold) {
            filter = { ...filter, sold: query.sold };
        }
        if (query.soldAt) {
            filter = { ...filter, status: query.status };
        }
        if (query.rsa) {
            const range_soldAt = query.rsa.split(':');
            filter = {
                ...filter,
                soldAt: {
                    $gte: new Date(range_soldAt[0]),
                    $lte: new Date(range_soldAt[1]),
                },
            };
        }
        if (query.producedAt) {
            filter = { ...filter, producedAt: query.producedAt };
        }
        if (query.expiredAt) {
            filter = { ...filter, expiredAt: query.expiredAt };
        }
        if (query.ne && query.ne === 'true') {
            filter = {
                ...filter,
                expiredAt: {
                    $lte: new Date(new Date().setDate(new Date().getDate() + 14)),
                    $gte: new Date(),
                },
            };
        }
        if (query.isExpired && query.isExpired === 'true') {
            filter = { ...filter, expiredAt: { $lte: new Date() } };
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

export const convertIncludes = (includes: null | string | undefined) => {
    let result: Array<string> = [];

    if (includes) {
        result = includes.split(',');
    }

    return result;
};

export const getQueriesPaginate = (query: Record<string, any>, type: TypeQuery = 'PRODUCT') => {
    const { sort = 'createdAt', order = 'desc', limit = 10, page = 1, ...rest } = query;

    return {
        sort: convertSort({ sort, order }),
        limit: Number(limit),
        page: Number(page),
        skip: (Number(page) - 1) * Number(limit),
        includes: convertIncludes(query.includes),
        query: createQueries(rest, type),
    };
};

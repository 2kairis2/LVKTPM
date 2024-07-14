/* eslint-disable no-unused-vars */

export enum TypeProduct {
    HAT_GIONG = 0,
    RAU_CU = 1,
    CAY_CANH = 2,
    PHAN_BON = 3,
    THUOC_TRU_SAU = 4,
    DUNG_CU_THUY_CANH = 5,
}

export enum FeatureProduct {
    BOT = 0,
    VIEN = 1,
    NUOC = 2,
    CAY = 3,
    CU = 4,
    LONG = 5,
}

export enum IPermission {
    CREATE_PRODUCT = 0,
    READ_PRODUCT = 1,
    UPDATE_PRODUCT = 2,
    DELETE_PRODUCT = 3,

    CREATE_PRODUCT_TYPE = 4,
    READ_PRODUCT_TYPE = 5,
    UPDATE_PRODUCT_TYPE = 6,
    DELETE_PRODUCT_TYPE = 7,

    CREATE_USER = 8,
    READ_USER = 9,
    UPDATE_USER = 10,

    CREATE_ORDER = 11,
    READ_ORDER = 12,
    UPDATE_ORDER = 13,

    CREATE_DISCOUNT = 14,
    READ_DISCOUNT = 15,
    UPDATE_DISCOUNT = 16,
    DELETE_DISCOUNT = 17,

    CREATE_INVENTORY_RECEIPT = 18,
    READ_INVENTORY_RECEIPT = 19,
    UPDATE_INVENTORY_RECEIPT = 20,

    CREATE_SUPPLIER = 21,
    READ_SUPPLIER = 22,
    UPDATE_SUPPLIER = 23,

    CREATE_ROLE = 24,
    READ_ROLE = 25,
    UPDATE_ROLE = 26,
    DELETE_ROLE = 27,

    CREATE_IMAGE = 28,
    READ_IMAGE = 29,
    UPDATE_IMAGE = 30,
    DELETE_IMAGE = 31,
}

/* eslint-disable no-unused-vars */

export enum PaymentMethod {
    COD = 0,
    VNPAY = 1,
}

export enum StatusInventoryReceipt {
    PENDING = 0,
    DONE = 1,
}

export enum StatusOrder {
    PENDING = 0,
    DELIVERING = 1,
    DONE = 2,
    FAILED = 3,
}

export enum StatusUser {
    ACTIVE = 0,
    BLOCK = 1,
}

export enum StatusProduct {
    DRAFT = 0,
    AVAILABLE = 1,
    SOLD = 2,
    STOP = 3,
}

export enum IPermission {
    CREATE_PRODUCT = 0,
    READ_PRODUCT = 1,
    UPDATE_PRODUCT = 2,
    DELETE_PRODUCT = 3,

    CREATE_TYPE = 4,
    READ_TYPE = 5,
    UPDATE_TYPE = 6,
    DELETE_TYPE = 7,

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
    DELETE_INVENTORY_RECEIPT = 21,

    CREATE_SUPPLIER = 22,
    READ_SUPPLIER = 23,
    UPDATE_SUPPLIER = 24,
    DELETE_SUPPLIER = 25,

    CREATE_ROLE = 26,
    READ_ROLE = 27,
    UPDATE_ROLE = 28,
    DELETE_ROLE = 29,

    CREATE_IMAGE = 30,
    READ_IMAGE = 31,
    UPDATE_IMAGE = 32,
    DELETE_IMAGE = 33,

    CREATE_PRODUCT_DETAIL = 34,
    READ_PRODUCT_DETAIL = 35,
    UPDATE_PRODUCT_DETAIL = 36,
    DELETE_PRODUCT_DETAIL = 37,

    CREATE_CATEGORY = 38,
    READ_CATEGORY = 39,
    UPDATE_CATEGORY = 40,
    DELETE_CATEGORY = 41,
}

export enum EBankCode {
    QRONLY = 'QRONLY',
    MBAPP = 'MBAPP',
    VNPAYQR = 'VNPAYQR',
    VNBANK = 'VNBANK',
    IB = 'IB',
    ATM = 'ATM',
    INTCARD = 'INTCARD',
    VISA = 'VISA',
    MASTERCARD = 'MASTERCARD',
    JCB = 'JCB',
    UPI = 'UPI',
    VIB = 'VIB',
    VIETCAPITALBANK = 'VIETCAPITALBANK',
    SCB = 'SCB',
    NCB = 'NCB',
    SACOMBANK = 'SACOMBANK',
    EXIMBANK = 'EXIMBANK',
    MSBANK = 'MSBANK',
    NAMABANK = 'NAMABANK',
    VNMART = 'VNMART',
    VIETINBANK = 'VIETINBANK',
    VIETCOMBANK = 'VIETCOMBANK',
    HDBANK = 'HDBANK',
    DONGABANK = 'DONGABANK',
    TPBANK = 'TPBANK',
    OJB = 'OJB',
    BIDV = 'BIDV',
    TECHCOMBANK = 'TECHCOMBANK',
    VPBANK = 'VPBANK',
    AGRIBANK = 'AGRIBANK',
    MBBANK = 'MBBANK',
    ACB = 'ACB',
    OCB = 'OCB',
    IVB = 'IVB',
    SHB = 'SHB',
    APPLEPAY = 'APPLEPAY',
    GOOGLEPAY = 'GOOGLEPAY',
}

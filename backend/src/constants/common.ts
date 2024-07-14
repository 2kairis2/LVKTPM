const USER_ROLE = {
    USER: 0,
    ADMIN: 1,
};

const TYPE_PRODUCT = {
    HAT_GIONG: 0,
    RAU_CU: 1,
    CAY_CANH: 2,
    PHAN_BON: 3,
    THUOC_TRU_SAU: 4,
    DUNG_CU_THUY_CANH: 5,
};

const FEATURE_PRODUCT = {
    BOT: 0,
    VIEN: 1,
    NUOC: 2,
    CAY: 3,
    CU: 4,
    LONG: 5,
};

const QUERY = {
    SORT_VALUES: ['asc', 'desc'],
};

const PAYMENT_METHOD = {
    KHI_NHAN_HANG: 0,
    QUA_VI_DIEN_TU: 1,
};

const DELIVERY_METHOD = {
    GIAO_HANG_TIET_KIEM: 0,
    GIAO_HANG_NHANH: 1,
};

const STATUS_ORDER = {
    DA_HUY: 0,
    DANG_CHO_XU_LY: 1,
    DANG_GIAO_HANG: 2,
    DA_HOAN_THANH: 3,
};

export { USER_ROLE, FEATURE_PRODUCT, TYPE_PRODUCT, QUERY, PAYMENT_METHOD, DELIVERY_METHOD, STATUS_ORDER };

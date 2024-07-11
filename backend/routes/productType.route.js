
const express = require('express');

const productType = require("../controllers/productType.controller");

const router = express.Router();

router.route('/products/types')
    .get(productType.getProductTypes)   
    .post(productType.createProductType)

router.route('/products/types/:typeId')
    .get(productType.getProductType)
    .put(productType.updateProductType)
    .delete(productType.deleteProductType);

module.exports = router;
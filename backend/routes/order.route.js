const express = require("express");

const order = require("../controllers/order.controller");

const router = express.Router();

router.route("/orders").get(order.getOrders)
router.route('/order/create').post(order.createOrder);
router.route("/orderdetail").get(order.getOrderById).put(order.updateOrderById);
router
  .route("/order/:orderId")
  .put(order.updateOrder)
  .delete(order.deleteOrder)
  .get(order.getOrder);

module.exports = router;

const Order = require("../models/order");
const productController = require("./product.controller");

exports.getOrders = async (req, res) => {
  try {
    const data = await Order.find().populate("user").populate("items.product");
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const orderId = req.param.id;
    const data = await Order.findById(orderId);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const data = await Order.findByIdAndUpdate(orderId, updatedData, options);

    if (!data) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    console.log(req.body);
    const data = await Order.create(req.body);
    await productController.reduceQuantity(req.body.items);
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const data = await Order.findByIdAndDelete(orderId);

    if (!data) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const data = await Order.findById(orderId)
      .populate("user")
      .populate("items.product");
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
exports.updateOrderById = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const updatedData = req.body;

    // Cập nhật đơn hàng
    let data = await Order.findByIdAndUpdate(orderId, updatedData, {
      new: true,
    })
      .populate("user")
      .populate("items.product");

    if (!data) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

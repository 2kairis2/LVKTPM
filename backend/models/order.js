const mongoose = require("mongoose");

const orderItemSchma = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchma],
  address: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    default: "Trực tiếp",
    required: true,
  },
  deliveryMethod: {
    type: String,
    default: "Giao hàng tiết kiệm",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  note: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    required: false,
    default: 4
  },
  total: {
    type: Number,
    required: true,
    nullable: false
  },

});

module.exports = mongoose.model("Order", orderSchema);

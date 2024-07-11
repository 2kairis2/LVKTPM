const CartItem = require("../models/CartItem");

exports.updateQuantity = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const quantity = req.body.quantity;

    await CartItem.findOneAndUpdate(
      { _id: cartItemId },
      { quantity: quantity }
    );

    return res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
exports.deleteCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;

    const deletedCartItem = await CartItem.findByIdAndDelete(cartItemId);
    if (!deletedCartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    return res.status(201).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteCartItems = async (req, res) => {
  try {
    const cartItemIds = req.body.ids; // Lấy danh sách các ids từ req.body

    // Kiểm tra xem danh sách ids có tồn tại không
    if (!cartItemIds || cartItemIds.length === 0) {
      return res.status(400).json({ error: "Ids are required" });
    }

    // Xoá các cartItem theo danh sách ids
    const result = await CartItem.deleteMany({ _id: { $in: cartItemIds } });

    // Kiểm tra xem có bao nhiêu cartItem đã bị xoá
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No cart items found with provided ids" });
    }

    return res.status(200).json({ message: "Cart items deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
const CartItem = require("../models/CartItem");
const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getCart = async (req, res) => {
  try {
    const userId = req.query.user;

    if (!userId) throw new Error("User ID is required");

    const data = await Cart.findOne({ user: userId }).populate({
      path: "items",
      populate: {
        path: "product",
      },
    });

    console.log(data);

    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const userId = req.body.user;
    if (!userId) throw new Error("User ID is required");

    const cart = await Cart.findOneAndUpdate({ user: userId }, updatedData);
    const cartItems = req.body.cartItems;

    return res.status(200).json({ data: updatedCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const userId = req.body.user;
    if (!userId) throw new Error("User ID is required");

    const deletedCart = await Cart.findOneAndDelete({ user: userId });
    if (!deletedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    return res.status(201).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { product, quantity, userId } = req.body;

    if (!userId) throw new Error("User ID is required");

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items",
      populate: {
        path: "product",
      },
    });

    if (!cart) {
      const cartItem = new CartItem({
        product: product._id,
        quantity: quantity,
      });
      await cartItem.save();

      const newCart = new Cart({
        user: userId,
        cartItems: [],
      });
      newCart.items.push(cartItem);
      await newCart.save();
    } else {
      if (cart.items.some((item) => item.product._id == product._id)) {
        const cartItemOld = cart.items.find(
          (item) => item.product._id == product._id
        );
        await CartItem.findByIdAndUpdate(cartItemOld._id, {
          quantity: cartItemOld.quantity + quantity,
        });
      } else {
        const cartItem = new CartItem({
          product: product._id,
          quantity: quantity,
        });
        await cartItem.save();

        cart.items.push(cartItem._id);

        await cart.save();
      }
    }

    return res
      .status(201)
      .json({ message: "Add Product to Cart successfully", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");

const cartRouter = require("./routes/cart.route");
const userRouter = require("./routes/user.route");
const oderRouter = require("./routes/order.route");
const productRouter = require("./routes/product.router");
const productTypeRouter = require("./routes/productType.route");
const cartItemRouter = require("./routes/cartItem.route");
const paymentRouter = require("./routes/payment.route");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/payment", paymentRouter);
app.use("/api", userRouter);
app.use("/api", cartRouter);
app.use("/api", oderRouter);
app.use("/api", productRouter);
app.use("/api", productTypeRouter);
app.use("/api", cartItemRouter);

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;

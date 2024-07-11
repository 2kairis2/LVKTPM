import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import axios from "axios";

import { formatPrice } from "../../utils/formatPrice";

import CartItem from "./CartItem";

function CartBody() {
  const [cart, setCart] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || { _id: "null" };
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/carts?user=" + user._id)
      .then((res) => {
        setCart(res.data.data.items);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteFromCart = (productId) => {
    axios
      .delete("http://localhost:8080/api/carts/" + productId)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="cart-form-warraper">
      <div className="warraper-title">
        <p>GIỎ HÀNG CỦA BẠN</p>
      </div>
      <div className="detail-cart">
        <div className="salelist">
          <section className="list-items">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} setCart={setCart} />
            ))}
          </section>
        </div>
        <div className="container-review">
          <div className="review">
            <h2 className="title-review">TÓM TẮT ĐƠN HÀNG</h2>
            <div className="line"></div>
            <div className="sum-wrapper">
              <p className="lable-summary">TỔNG GIÁ</p>
              <p className="summary">
                {formatPrice(
                  cart.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                  )
                )}
              </p>
            </div>
          </div>
          <div className="line"></div>
          <div className="check-out">
            {cart.length > 0 ? (
              <Link to="/order">
                <button className="btn-submit">THANH TOÁN</button>
              </Link>
            ) : (
              <button className="btn-submit" disabled>
                THANH TOÁN
              </button>
            )}
            <button className="btn-continue" onClick={handleBack}>
              TIẾP TỤC MUA HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartBody;

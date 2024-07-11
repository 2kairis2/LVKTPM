import { useEffect, useState } from "react";
// import { CartData } from "../../common/json/CartData";
import "../cart/Cart.css";
import "./Order.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function OrderBody() {
  const user = JSON.parse(localStorage.getItem("user")) || { _id: "null" };
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(
    "Thanh toán khi nhận hàng"
  );
  const [deliveryOPtions, setDeliveryOPtions] = useState("Giao hàng nhanh");
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState(null);
  const [orderData, setOrderData] = useState({
    address: user.address || "",
    paymentMethod: "Thanh toán khi nhận hàng" || "",
    deliveryMethod: "Giao hàng tiết kiệm" || "",
    user: user._id || "",
    note: "",
    transport: "15.000",
  });
  const [address, setAddress] = useState({
    recipientName: "",
    phoneNumber: "",
    provinceCity: "",
    district: "",
    ward: "",
    detailAddress: "",
    isDefaultAddress: false,
  });

  const postData = () => {
    const {
      recipientName,
      phoneNumber,
      provinceCity,
      district,
      ward,
      detailAddress,
    } = address;

    fetch(`${process.env.REACT_APP_IP}/v1/orders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryOPtions,
        address: `${recipientName}; ${phoneNumber}; ${detailAddress}, ${ward}, ${district}, ${provinceCity}`,
        items: cartItems,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data?.data);
        localStorage.setItem("orderId", data?.data?._id);
      })
      .catch((error) => {
        console.log("error: " + error);
        alert("Lỗi! Vui lòng thử lại");
      });
  };

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const [addressType, setAddressType] = useState("Default");
  const [summary, setSummary] = useState("0");
  const navigate = useNavigate();
  useEffect(() => {
    getOrderData();
  }, []);

  useEffect(() => {
    calculateSummary();
  }, [orderData.transport, cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value === "15.000") {
      orderData.deliveryMethod = "Giao hàng tiết kiệm";
    } else if (value === "35.000") {
      orderData.deliveryMethod = "Giao hàng nhanh";
    }

    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
      deliveryMethod: orderData.deliveryMethod,
    }));
  };

  const handleChangePaymentMethod = (e) => {
    const { name, value } = e.target;

    if (value === "cash") {
      orderData.paymentMethod = "Thanh toán khi nhận hàng";
    } else if (value === "onlinePayment") {
      orderData.paymentMethod = "Thanh toán trực tuyến";
    }
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
      paymentMethod: orderData.paymentMethod,
    }));
  };
  const handleChangeAddressType = (e) => {
    setAddressType(e.target.value);
  };

  const handleSubmitonline = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/payment/create_payment_url`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 1000 * localStorage.getItem("totalPrice"),
        bankCode: "NCB",
        language: "vn",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.open(data?.vnpUrl, "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const requestData = {
        items: cart,
        address: orderData.address,
        paymentMethod: orderData.paymentMethod,
        deliveryMethod: orderData.deliveryMethod,
        user: orderData.user,
        note: orderData.note,
        total: summary,
      };
      console.log(requestData);
      const response = await axios.post(
        `http://localhost:8080/api/order/create`,
        requestData
      );
      console.log("Order created:", response.data);
      if (response.status === 200 || response.status === 201) {
        // Thực hiện xoá các cart item từ giỏ hàng
        const deleteResponse = await deletePaidItemsFromCart();
        if (deleteResponse || deleteResponse.success) {
          // Xoá thành công, chuyển hướng đến trang cart
          navigate("/invoice?orderId=" + response.data._id);
          alert("Chúc mùng bạn đã đặt hàng thành công!!!");
        } else {
          // Xoá không thành công, xử lý theo cách thích hợp (ví dụ: hiển thị thông báo lỗi)
          console.error(
            "Error deleting paid items from cart:",
            deleteResponse.error
          );
        }
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  // console.log(cart);
  const submit = () => {
    // onSubmit();
    if (orderData.paymentMethod === "Thanh toán trực tuyến") {
      handleSubmitonline();
      handleSubmit();
    } else {
      handleSubmit();
    }
  };
  // const onSubmit = () => {};
  const deletePaidItemsFromCart = async () => {
    try {
      // Lấy danh sách các sản phẩm trong giỏ hàng
      const paidItemsIds = cart.map((item) => item._id);
      console.log(paidItemsIds);
      // Gửi yêu cầu để xoá các sản phẩm đã thanh toán
      const deleteResponse = await axios.delete(
        "http://localhost:8080/api/cart-items",
        { data: { ids: paidItemsIds } }
      );

      // Xoá các sản phẩm đã thanh toán khỏi state của giỏ hàng
      const updatedCart = cart.filter((item) => !item.isPaid);
      setCart(updatedCart);
      return deleteResponse.data;
    } catch (error) {
      console.error("Error deleting paid items from cart:", error);
      return { success: false, error: error.message };
    }
  };
  const totalBill = () => {
    return (
      cart.reduce(
        (total, item) =>
          total + Number(item.product.price) * Number(item.quantity),
        0
      ) / 1000
    );
  };

  const getOrderData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/carts?user=${user._id}`
      );
      const data = response.data.data.items;
      if (data !== null) {
        setCart(data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  const calculateSummary = () => {
    const total = totalBill() + Number(orderData.transport);
    setSummary(total.toFixed(3)); // Đảm bảo rằng tổng cộng có tối đa 3 chữ số thập phân
  };
  const listOrder = cart.map((item) => (
    <div className="item in-order" key={item._id}>
      <div className="item-detail">
        <img
          src={"http://localhost:8080" + item.product.images[0].path}
          alt={item.product.name}
        />
        {item.product.name}
      </div>
      <div className="quantity-item">
        <input
          className="q-order"
          value={item.quantity}
          type="number"
          readOnly
        />
      </div>
      <div className="price-item">
        {formatNumber((Number(item.product.price) / 1000).toFixed(3))} vnd
      </div>
      <div className="total">
        {formatNumber(
          ((Number(item.product.price) * Number(item.quantity)) / 1000).toFixed(
            3
          )
        )}{" "}
        vnd
      </div>
    </div>
  ));
  localStorage.setItem("totalPrice", summary);

  return (
    <main className="wrapper-order">
      <div className="title-page">
        <h1>Đơn hàng của bạn</h1>
      </div>
      <section className="order-detail">
        <div className="head-table">
          <p>Tóm tắt đơn hàng</p>
          <p>Số lượng</p>
          <p>Giá</p>
          <p className="head-total">Tổng cộng</p>
        </div>
        <div className="itemList">{listOrder}</div>
        <div className="total-bill">
          <div className="form-custom"> Tổng giá sản phẩm</div>
          <div>{formatNumber(totalBill().toFixed(3))} vnd</div>
        </div>
      </section>
      <div className="inf-custom">
        <form className="address-form">
          <h2>Chi tiết địa chỉ</h2>

          <label className="label form-custom" htmlFor="name-custom">
            Tên người nhận
          </label>

          <input
            type="text"
            name="name-custom"
            value={user.fullname}
            disabled
            className=" input-form"
          ></input>
          <label className="label form-custom" htmlFor="phone-number">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone-number"
            value={user.phone}
            disabled
            className=" input-form"
          ></input>
          {/* <label className="label form-custom" htmlFor="city">Tỉnh/thành phố</label>
                    <input type="text" name="city" disabled={{}} className=" input-form"></input>
                    <label className="label form-custom" htmlFor="distric">Quận/ huyện</label>
                    <input type="text" name="distric" className=" input-form"></input>
                    <label className="label form-custom" htmlFor="ward">Phường/ xã</label>
                    <input type="text" name="ward" className=" input-form"></input> */}
          <label className="label form-custom" htmlFor="detail-custom">
            Ghi chú
          </label>
          <input
            type="text"
            name="note"
            value={orderData.note}
            onChange={handleChange}
            className=" input-form"
          ></input>
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={orderData.address}
            onChange={handleChange}
            disabled={addressType === "Default"}
          />
        </form>
        <div className="choose-receivers">
          <h2>Địa chỉ nhận hàng</h2>
          <p>Vui lòng chọn địa chỉ mặc định hoặc thêm mới địa chỉ nhận hàng</p>
          <div className="form-group">
            <input
              type="radio"
              id="default"
              name="address"
              value="Default"
              checked={addressType === "Default"} // Kiểm tra nếu địa chỉ là mặc định
              onChange={handleChangeAddressType} // Gọi hàm handleChange khi có sự kiện onChange
            />
            <label htmlFor="default">Mặc định</label>
          </div>
          <div className="form-group">
            <input
              type="radio"
              id="add"
              name="address"
              value={"Add new address"}
              checked={addressType !== "Default"} // Kiểm tra nếu địa chỉ là thêm địa chỉ mới
              onChange={handleChangeAddressType} // Gọi hàm handleChange khi có sự kiện onChange
            />
            <label htmlFor="add">Thêm địa chỉ mới</label>
          </div>
        </div>
      </div>
      <div className="transport">
        <h2>Loại vận chuyển</h2>
        <div className="select-radio">
          <div className="option-gh">
            <div>
              <input
                type="radio"
                id="ghtk"
                name="transport"
                value="15.000"
                checked={orderData.transport === "15.000"}
                onChange={handleChange}
              ></input>
              <label htmlFor="ghtk">Giao hàng tiết kiệm</label>
            </div>
            <p>Giao hàng sau 3-5 ngày</p>
            <p>15.000 vnd</p>
          </div>
          <div className="option-gh">
            <div>
              <input
                type="radio"
                id="ghn"
                name="transport"
                value="35.000"
                checked={orderData.transport === "35.000"}
                onChange={handleChange}
              ></input>
              <label htmlFor="ghn">Giao hàng nhanh</label>
            </div>
            <p>Giao hàng sau 1-2 ngày</p>
            <p>35.000 vnd</p>
          </div>
        </div>
      </div>
      <div className="footbill">
        <div>
          <h2>Hình thức thanh toán</h2>
          <input
            type="radio"
            name="paymentMethod"
            id="cash"
            value="cash"
            onChange={handleChangePaymentMethod}
            // checked
          />
          <label htmlFor="cash">Thanh toán khi nhận hàng</label>
          <br />
          <input
            type="radio"
            name="paymentMethod"
            id="onlinePayment"
            value="onlinePayment"
            onChange={handleChangePaymentMethod}
          />
          <label htmlFor="onlinePayment">Thanh toán trực tuyến</label>
        </div>
        <div>
          <h2>Tóm tắt thanh toán</h2>
          <div className="summary">
            <p>
              <span>Tổng giá hàng:</span>
              <span>{formatNumber(totalBill().toFixed(3))} vnd</span>
            </p>
            <p>
              <span>Phí vận chuyển:</span>
              <span>{formatNumber(orderData.transport)} vnd</span>
            </p>
            <p>
              <span>Tổng đơn hàng:</span>
              <span>{formatNumber(summary)} vnd</span>
            </p>
          </div>
        </div>
      </div>
      <div className="check-out">
        {/* <a href="/invoice"> */}
        <button onClick={submit} className="btn-submit">
          {" "}
          Đặt hàng
        </button>
        {/* </a> */}
      </div>
    </main>
  );
}
export default OrderBody;

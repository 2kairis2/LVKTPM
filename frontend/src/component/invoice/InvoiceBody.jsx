import { useEffect, useRef, useState } from "react";
// import { CartData } from "../../../common/json/CartData";
import "../cart/Cart.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./InvoiceBody.css";
import { PrintBill } from "../print";
import { useReactToPrint } from "react-to-print";

function InvoiceBody() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const refBill = useRef();
  const [hasAlerted, setHasAlerted] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn trang lên đầu
  }, [orderId]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/orderDetail?orderId=${orderId}`
        );

        const data = await response.data;
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (!order) return;

    // Calculate total summary
    const totalBill = order.items.reduce((total, item) => {
      return (
        total +
        (Number.parseInt(item.product.price) *
          Number.parseFloat(item.quantity)) /
          1000
      );
    }, 0);
    const total = order.total;
    setSummary(total.toFixed(3)); // Format to 3 decimal places
  }, [order]);
  const totalBill = () => {
    var tmp = 0;
    if (order && order.items)
      order.items.forEach((item) => {
        tmp =
          tmp +
          Number.parseInt(item.product.price) *
            Number.parseFloat(item.quantity);
      });
    return tmp / 1000 + ".000";
  };
  useEffect(() => {
    if (order && order.paymentStatus === "success" && !hasAlerted) {
      navigate("/your/success/page");
      setHasAlerted(true);
    }
  }, [order, hasAlerted, navigate]);

  // Handle transport change
  const handleNavigate = () => {
    navigate("/product/search?type=Hạt%20giống");
  };

  const handleUpdate = (status) => {
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_SERVER_URL}/orderdetail?orderId=${order._id}`,
      data: {
        status: status,
      },
    }).then((response) => {
      const data = response.data;
      if (response.status === 200) {
        setOrder(data);
        navigate("/admin");
      }
    });
  };
  // Render order items
  let listOrder = null;
  if (order && order.items) {
    listOrder = order.items.map((item) => (
      <div className="item in-order-section" key={item._id}>
        <div className="item-detail">{item.product.name}</div>
        <div className="quantity-item">
          <input
            className="q-order"
            value={item.quantity}
            type="number"
            readOnly
          />
        </div>
        <div className="price-item">
          {(Number.parseInt(item.product.price) / 1000).toFixed(3)} VND
        </div>
        <div className="total">
          {(
            (Number.parseInt(item.product.price) *
              Number.parseInt(item.quantity)) /
            1000
          ).toFixed(3)}{" "}
          VND
        </div>
      </div>
    ));
  }
  // console.log(listOrder);
  // console.log(order);

  const handlePrint = useReactToPrint({
    content: () => refBill.current,
  });

  return (
    <main className="wrapper-invoice">
      <div className="title-page">
        <h1>Hoá đơn mua hàng</h1>
      </div>
      <div className="inf-show">
        <div className="choose-receiver">
          {/* <h2>Thông tin giao hàng</h2> */}
          <div className="address">
            <div className="address-title">
              <p>Tên người nhận:</p>
              <p>Số điện thoại:</p>
              <p>Địa chỉ:</p>
              <p>Email:</p>
            </div>
            <div className="address-detail">
              {order && (
                <>
                  <p>{order.user.fullname}</p>
                  <p>{order.user.phone}</p>
                  <p>{order.user.address || order.address}</p>
                  <p>{order.user.email}</p>
                </>
              )}
            </div>
            <div className="transportation">
              <div className="transport-title">
                <p>Loại vận chuyển:</p>
                <p>Hình thức thanh toán:</p>
              </div>
              <div className="transport-detail">
                <p>{order && order.deliveryMethod}</p>
                <p>{order && order.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="order-detail">
        <div className="header-table">
          <p>Tên sản phẩm</p>
          <p>Số lượng</p>
          <p>Giá</p>
          <p className="header-total">Tổng cộng</p>
        </div>
        <div className="item-List">{listOrder && listOrder}</div>
        <div className="invoice-total">
          <div className="title-total">
            {" "}
            <p>Tổng giá sản phẩm:</p>
            <p>Phí vận chuyển:</p>
            <p>
              <strong>Tổng đơn hàng:</strong>
            </p>
          </div>
          <div className="detail-total">
            <p>{totalBill()} vnd</p>
            <p>
              {order && order.deliveryMethod === "Giao hàng tiết kiệm"
                ? "15.000"
                : "30.000"}{" "}
              vnd
            </p>
            <p>
              <strong>{summary} vnd</strong>
            </p>
          </div>
          {/* <div className="total-price">
            <div className="form-custom"> Tổng giá sản phẩm</div>
            <div>{totalBill()} vnd</div>
          </div>
          <div className="delivery-fee">
            <div className="fee">Phí vận chuyển</div>
            <div>
              
            </div>
          </div>
          <div className="total">
            <div className="bill"> Tổng đơn hàng</div>
            <div></div>
          </div> */}
        </div>
      </section>
      <div
        className="check-out-btn"
        style={{ display: "flex", "grid-template-columns": "repeat(2, auto)" }}
      >
        <button className="btn-continue-order" onClick={handleNavigate}>
          Tiếp tục mua hàng
        </button>
        <button className="btn-print" onClick={handlePrint}>
          In hoá đơn
        </button>
      </div>
      {order && (
        <div style={{ display: "none" }}>
          <PrintBill
            order={order}
            summary={summary}
            totalBill={totalBill}
            ref={refBill}
          />
        </div>
      )}
    </main>
  );
}

export default InvoiceBody;

import React from "react";
export const PrintBill = React.forwardRef(function PrintBill(
  { order, summary, totalBill },
  ref
) {
  let listOrder = null;
  if (order && order.items) {
    listOrder = order.items.map((item) => (
      <div className="item in-order-section" key={item._id}>
        <div className="item-detail">
          <img
            src={`http://localhost:8080${item.product.images[0].path}`}
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
          {(Number.parseInt(item.product.price) / 1000).toFixed(3)} vnd
        </div>
        <div className="total">
          {(
            (Number.parseInt(item.product.price) *
              Number.parseInt(item.quantity)) /
            1000
          ).toFixed(3)}{" "}
          vnd
        </div>
      </div>
    ));
  }
  return (
    <main className="wrapper-ordersection" ref={ref} style={{ width: "100%" }}>
      <div className="title-page">
        <h1>Chi tiết đơn hàng </h1>
      </div>
      <section className="order-detail">
        <div className="header-table">
          <p>Tóm tắt đơn hàng</p>
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
        </div>
      </section>
      <div className="inf-show">
        <div className="choose-receiver">
          <h2>Thông tin giao hàng</h2>
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
    </main>
  );
});

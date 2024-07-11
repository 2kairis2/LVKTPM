import React, { useEffect, useState } from "react";
import "./AccountOrder.css";
import { OrderData } from "../../common/json/OrderData";
import { Link } from "react-router-dom";
import axios from "axios";
function AccountOrder() {
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : {};
  const orders = user?.orders ?? []

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };
  console.log(orders)
  return (

    <>
      <div className="text-b-lg">ĐƠN HÀNG CỦA BẠN </div>
      {orders && orders.length < 1 ? (
        <div className="body-container">
          <div
            className="text-b-sm text-center"
            style={{
              marginBlock: 20,
            }}
          >
            BẠN CHƯA CÓ ĐƠN HÀNG NÀO !
          </div>
          <div className="image-head-order">
            <img
              src={
                process.env.PUBLIC_URL + "/images/account/flowerpot_7302490.png"
              }
              className=""
            />
          </div>
          <div
            className="text-sm text-center"
            style={{
              marginBlock: 20,
            }}
          >
            Tạo đơn hàng mới ngay nào !
          </div>
        </div>
      ) : (
        <div className="list-order-body">
          {orders &&
            orders.map((item, idx) => {
              return (
                <div class="flex-column order-list-item" key={item._id}>
                  <div className="d-flex sm-flex-column">
                    <div class="flex-item">#{item._id}</div>
                    <div class="flex-item flex-grow-2">{new Date(item.createdAt).toLocaleDateString()}</div>
                  </div>
                  <hr className="hr" />
                  {isOpen ? (
                    <div className="list-product-container">
                      {item.items.map((data, _idx) => (
                        <div className={`foot-list-product`} key={_idx}>
                          <div className="flex-item">{data.product.name}</div>
                          <div className="flex-item">
                            SL{" : "}
                            {data.quantity}
                          </div>
                          <div className="flex-item">
                            <u>{Number(data.product.price) + " " + "VND"}</u>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="d-flex sm-flex-column">
                      {item.items.map((data, idx) => {
                        return (
                          <span className="">
                            {data.product.name}{" "}
                            {idx === item.items.length - 1 ? "..." : ","}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <div className="d-flex sm-flex-column mv-15">
                    <div class="flex-item">
                      <b>Phí giao hàng</b>
                    </div>
                    <div class="flex-item flex-grow-2">

                      {item.deliveryMethod === "Giao hàng tiết kiệm" ?
                        <u> {Number(15).toFixed(3) + " " + "VND"}</u>
                        : <u> {Number(30).toFixed(3) + " " + "VND"}</u>}
                    </div>
                  </div>

                  <div className="d-flex sm-flex-column mb-15">
                    <div class="flex-item">
                      <b>Tổng đơn hàng</b>
                    </div>
                    <div class="flex-item flex-grow-2">
                      <u> {Number(item.total).toFixed(3) + " " + "VND"}</u>
                    </div>
                  </div>
                  <hr className="hr" />
                  <div className="d-flex sm-flex-column mb-15">
                    <div class="flex-item">
                      <b>Tình trạng đơn hàng</b>
                    </div>
                    <div class="flex-item">
                      <b>{item.orderDate}</b>
                    </div>
                    <div class="flex-item">
                      {item.status === 1
                        ? "Đã xác nhận"
                        : item.status === 2
                          ? "Đã giao hàng"
                          : item.status === 3
                            ? "Đã gửi hàng"
                            : "Chưa được xác nhận"}
                    </div>
                  </div>

                  <Link onClick={toggleCollapsible} className="btn">
                    {isOpen === true ? "Thu gọn" : "Xem chi tiết"}
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default AccountOrder;

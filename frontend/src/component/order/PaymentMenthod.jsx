import { useState } from "react";
import { redirect } from "react-router-dom";
// import PaymentForm from "./PaymentForm";

const PaymentMethod = ({
  paymentMethod,
  handleClicked,
  setPaymentMethod,
  onSubmit,
}) => {
  const handleChangeMethod = (event) => {
    setPaymentMethod(event.target.classList.item(0));
  };

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_IP}/v1/payments/create_payment_url`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: localStorage.getItem("totalPrice"),
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

  const submit = () => {
    onSubmit();
    console.log("payment " + paymentMethod);
    if (paymentMethod === "cod") {
      alert("Mua hàng thành công");
      handleClicked();
    } else {
      handleSubmit();
    }
  };

  return (
    <div id="PaymentMethod">
      <div className="payment-method-title">Hình thức thanh toán</div>
      <div className="payment-method-body">
        <div className="method-choice">
          <div
            className={
              "cod payment-method-cod " +
              (paymentMethod === "cod" ? "enable" : "")
            }
            onClick={handleChangeMethod}
          >
            COD
            <br /> (Thanh toán khi nhận hàng)
          </div>
          <div
            className={
              "online payment-method-online " +
              (paymentMethod === "online" ? "enable" : "")
            }
            onClick={handleChangeMethod}
          >
            Thanh toán trực tuyến <br /> (Thông qua VNPay)
          </div>
        </div>
        <div className="button confirm-payment-btn" onClick={submit}>
          Thanh toán
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;

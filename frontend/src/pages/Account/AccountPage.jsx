import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./AccountPage.css";
import Header from "../../component/fixed/Header";
import Footer from "../../component/fixed/Footer";
import AccountHeader from "../../component/account/AccountHeader";
import AccountOverview from "./AccountOverview";
import AccountInfor from "./AccountInfor";
import AccountChangePassword from "./AccountChangePassword";
import AccountOrder from "./AccountOrder";
function AccountPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Header />
      <div className="container">
        <AccountHeader />
        <div className="account-body">
          <div className="left">
            <div className="text-b-lg">TÀI KHOẢN</div>
            <div className="tabs-container">
              <ul className="vertical-tabs">
                <li
                  className={activeTab === 1 ? "active" : ""}
                  onClick={() => handleTabClick(1)}
                >
                  <a href="#">TỔNG QUAN</a>
                </li>
                <li
                  className={activeTab === 2 ? "active" : ""}
                  onClick={() => handleTabClick(2)}
                >
                  <a href="#">THÔNG TIN TÀI KHOẢN</a>
                </li>
                <li
                  className={activeTab === 3 ? "active" : ""}
                  onClick={() => handleTabClick(3)}
                >
                  <a href="#">ĐỔI MẬT KHẨU</a>
                </li>
                <li
                  className={activeTab === 4 ? "active" : ""}
                  onClick={() => handleTabClick(4)}
                >
                  <a href="#">ĐƠN HÀNG</a>
                </li>
                <button className="btn-logout" onClick={handleLogOut}>
                  ĐĂNG XUẤT
                </button>
              </ul>
            </div>
          </div>
          <div className="right">
            <div className="tab-content">
              {activeTab === 1 && <AccountOverview />}
              {activeTab === 2 && <AccountInfor />}
              {activeTab === 3 && <AccountChangePassword />}
              {activeTab === 4 && <AccountOrder />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AccountPage;

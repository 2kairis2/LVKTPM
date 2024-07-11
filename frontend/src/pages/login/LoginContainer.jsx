import "./LoginContainer.css";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import aixos from "axios";

function LoginContainer() {
  const navigate = useNavigate();

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleLogin = () => {
    aixos
      .post("http://localhost:8080/api/login", {
        username: usernameValue,
        password: passwordValue,
      })
      .then((res) => {
        const userData = res.data.user;
        const orders = res.data.orders; // Giả sử res.data.orders chứa danh sách các đơn hàng từ phản hồi API
        userData.orders = orders; // Đặt danh sách đơn hàng vào trong đối tượng người dùng
        localStorage.setItem("user", JSON.stringify(userData));
        if (userData.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
        
      })
      .catch((error) => {
        if (usernameValue === "" || passwordValue === "") {
          alert("Vui lòng nhập đầy đủ thông tin");
        } else {
          alert("Password hoặc Tên Tài Khoản không hợp lệ");
        }
        
        console.error(error);
      });
  };
  return (
    <div className="LoginContainer">
      <div className="InnerLoginContainer">
        <div className="login-content">
          <div className="login-image">
            <img
              alt="home"
              src={process.env.PUBLIC_URL + "/images/fixed/image 30.png"}
            ></img>
          </div>
          <div className="Title">
            <p>ĐĂNG NHẬP VÀO TÀI KHOẢN CỦA BẠN</p>
          </div>
          <div className="login-form">
            <form>
              <div className="username input-item">
                <label
                  htmlFor="username"
                  className="username-placeholder input-label"
                >
                  TÊN TÀI KHOẢN
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="login-input-field"
                  value={usernameValue}
                  onChange={(e) => setUsernameValue(e.target.value)}
                ></input>
              </div>

              <div className="password input-item">
                <label
                  htmlFor="password"
                  className="password-placeholder input-label"
                >
                  MẬT KHẨU
                </label>
                <input
                  type="password"
                  className="login-input-field"
                  name="password"
                  id="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="forgot-password">
            <a href="#l">Quên mật khẩu?</a>
          </div>
          <div className="login-button">
            <button onClick={handleLogin}>Đăng nhập</button>
            {/* <Link to={`/account`}>
              <button onclick= {handleLogin}>Đăng nhập</button>
            </Link> */}
          </div>
        </div>
        <div className="fixed-img">
          <img
            alt="login"
            src={process.env.PUBLIC_URL + "/images/login/img login.png"}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;

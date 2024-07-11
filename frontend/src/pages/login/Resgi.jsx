import "./Ressgi.css";
import { useState } from "react";
import aixos from "axios";

/**
 *  contain left -> if login -> form else -> image
 *  contain right -> if login -> image else -> form
 * @returns
 */
function RegisterContainer() {
  // const [isUsernameFocused, setUsernameFocused] = useState(true);
  // const [isPasswordFocused, setPasswordFocused] = useState(true);
  // const [isEmail, setEmailFocused] = useState(true);
  // const [isRePasswordFocused, setRePasswordFocused] = useState(true);

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [repasswordValue, setRePasswordValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [fullnameValue, setFullnameValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [birthdayValue, setBirthdayValue] = useState("");

  const handleRegister = () => {
    if (passwordValue !== repasswordValue) {
      alert("Mật khẩu và nhập lại mật khẩu không trùng khớp.");
    }
    aixos
      .post("http://localhost:8080/api/register", {
        username: usernameValue,
        password: passwordValue,
        email: emailValue,
        fullname: fullnameValue,
        phone: phoneValue,
        gender: genderValue,
        address: addressValue,
        birthday: birthdayValue,
      })
      .then((res) => {
        alert(res.data.message);
        window.location.href = "/loginpage";
      })
      .catch((error) => {
        alert(error.response.data.error);
        console.error(error);
      });
  };

  return (
    <div className="RegisterContainer">
      <div className="InnerRegisterContainer">
        <div className="fixed-img">
          <img
            alt="register"
            src={process.env.PUBLIC_URL + "/images/login/img login.png"}
          />
        </div>
        <div className="register-content">
          <div className="register-image">
            <img
              alt="home"
              src={process.env.PUBLIC_URL + "/images/fixed/image 29.png"}
            ></img>
          </div>

          <div className="register-form">
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
                  className="register-input-field"
                  value={usernameValue}
                  onChange={(e) => setUsernameValue(e.target.value)}
                  // onFocus={() => setUsernameFocused(true)}
                  // onBlur={() =>
                  //     setUsernameFocused(false)}
                ></input>
              </div>
              <div className="email input-item">
                <label
                  htmlFor="email"
                  className="email-placeholder input-label"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  className="register-input-field"
                  onChange={(e) => setEmailValue(e.target.value)}
                  // onFocus={() => setEmailFocused(true)}
                  // onBlur={() =>
                  //     setEmailFocused(false)
                  // }
                ></input>
              </div>
              <div className="phone input-item">
                <label
                  htmlFor="phone"
                  className="phone-placeholder input-label"
                >
                  SỐ ĐIỆN THOẠI
                </label>
                <input
                  type="phone"
                  name="phone"
                  className="register-input-field"
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  // onFocus={() => setPhoneFocus(true)}
                  // onBlur={() =>
                  //     setPhoneFocus(false)
                  // }
                ></input>
              </div>
              <div className="fullname input-item">
                <label
                  htmlFor="fullname"
                  className="fullname-placeholder input-label"
                >
                  HỌ VÀ TÊN CỦA BẠN
                </label>
                <input
                  type="fullname"
                  name="fullname"
                  className="register-input-field"
                  value={fullnameValue}
                  onChange={(e) => setFullnameValue(e.target.value)}
                ></input>
              </div>
              <div className="gender input-item">
                <select
                  id="gender"
                  name="gender"
                  onChange={(e) => setGenderValue(e.target.value)}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nu</option>
                  <option value="Khác">Khác</option>
                </select>
                {/* <label
                  htmlFor="gender"
                  className="gender-placeholder input-label"
                >
                  GIỚI TÍNH
                </label>
                <input
                  type="gender"
                  name="gender"
                  className="register-input-field"
                  value={genderValue}
                  
                /> */}
              </div>
              <div className="address input-item">
                <label
                  htmlFor="address"
                  className="address-placeholder input-label"
                >
                  ĐỊA CHỈ
                </label>
                <input
                  type="address"
                  name="address"
                  className="register-input-field"
                  value={addressValue}
                  onChange={(e) => setAddressValue(e.target.value)}
                ></input>
              </div>
              <div className="birthday input-item">
                <label
                  htmlFor="birthday"
                  className="birthday-placeholder input-label"
                >
                  NGÀY SINH
                </label>
                <input
                  type="date"
                  name="birthday"
                  className="register-input-field"
                  value={birthdayValue}
                  onChange={(e) => setBirthdayValue(e.target.value)}
                ></input>
              </div>

              <div className="password input-item">
                <label
                  htmlFor="password"
                  className="password-placeholder input-label"
                >
                  MẬT KHẨU MỚI
                </label>
                <input
                  type="password"
                  // placeholder='MẬT KHẨU'
                  className="register-input-field"
                  name="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  // onFocus={() => setPasswordFocused(true)}
                  // onBlur={() => setPasswordFocused(false)}
                />
              </div>
              <div className="repassword input-item">
                <label
                  htmlFor="repassword"
                  className="repassword-placeholder input-label"
                >
                  NHẬP LẠI MẬT KHẨU
                </label>
                <input
                  type="repassword"
                  // placeholder='MẬT KHẨU'
                  className="register-input-field"
                  name="repassword"
                  value={repasswordValue}
                  onChange={(e) => setRePasswordValue(e.target.value)}
                  // onFocus={() => setRePasswordFocused(true)}
                  // onBlur={() => setRePasswordFocused(false)}
                />
              </div>
            </form>
          </div>

          <div className="register-button">
            <button onClick={handleRegister}>ĐĂNG KÝ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterContainer;

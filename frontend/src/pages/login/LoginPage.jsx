import "./LoginContainer.css";
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 *  contain left -> if login -> form else -> image
 *  contain right -> if login -> image else -> form
 * @returns
 */
function LoginContainer({}) {
  const [isUsernameFocused, setUsernameFocused] = useState(true);
  const [isPasswordFocused, setPasswordFocused] = useState(true);

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <div className="LoginContainer">
      <div className="InnerLoginContainer">
        <div className="login-content">
          <div className="login-image">
            <img
              alt="home"
              src={process.env.PUBLIC_URL + "/images/fixed/image 29.png"}
            ></img>
          </div>
          <div className="button-container">
                   <div className="login-button">
            <Link to={`/login`}>
              <button>ĐĂNG NHẬP</button>
            </Link>
          </div>
          <div className="login-button">
            <Link to={`/register`}>
              <button>ĐĂNG KÝ</button>
            </Link>
          </div>
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

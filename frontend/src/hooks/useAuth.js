import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const useAuth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNavigateLogin, setIsNavigateLogin] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    
    console.log(token);
    if (token) {
      setIsLogin(true);
      setUser(token);
      
    }
    if (token?.isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isNavigateLogin) {
      if (!window.confirm("Vui long dang nhap!!!"))
        return setIsNavigateLogin(false);
      setIsNavigateLogin(false);
      navigate("/loginpage");
    }
  }, [isNavigateLogin]);

  return { isLogin, setIsLogin, setIsNavigateLogin, user };
};

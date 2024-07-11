import "./DetailProductSale.css";

import axios from "axios";

import Image from "../Image/Image";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function DetailProductSale({ product }) {
  const { setIsNavigateLogin, user, isLogin } = useAuth();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (product.quantity === 0) {
      alert("Sản phẩm này đã hết hàng.");
      return;
    }
    if (!isLogin) {
      setIsNavigateLogin(true);
      return;
    }
    axios
      .post("http://localhost:8080/api/carts", {
        userId: user._id,
        product: product,
        quantity: 1,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    alert("Thêm sản phẩm vào giỏ hàng thành công");
  };
  const handleAddCartButton = () => {
    navigate("/cart");
  };
  const formattedPrice = product.price.toLocaleString("vi-VN");
  return (
    <div className="detail-productsale-container">
      <div className="image-layout">
        <Image src={product.images[0].path} alt={product.name} />
      </div>
      <div className="detail-layout">
        <div className="detail-container">
          <h2>{product.type}</h2>
          <div className="h1">
            <h1>{product.name}</h1>
          </div>
          <div className="info">
            <p>{product?.fastdescription}</p>
          </div>
          <div className="price">
            <p>Giá:</p>
            <p>{formattedPrice}VND</p>{" "}
          </div>
          <div className="product-button">
            <button
              className="add-product-btn"
              onClick={() => handleAddToCart()}
            >
              Thêm vào giỏ hàng
            </button>
            <button onClick={handleAddCartButton} className="purchase-btn">
              Mua hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

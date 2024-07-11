import { ProductData } from "../../common/json/ProductData";
import BestSellerItem from "./BestSellerItem";
import { useState, useEffect } from "react";
import "./DetailProductRecomment.css";
import { NavLink } from "react-router-dom";
import ProductItems from "./../product/ProductItems";

export default function DetailProductRecommend() {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const getRandomProducts = () => {
      const shuffled = ProductData.sort(() => 0.5 - Math.random());
      const selectedProducts = shuffled.slice(0, 4);
      return selectedProducts;
    };

    setRandomProducts(getRandomProducts());
  }, []);
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div className="DetailProductRecommend">
      <div className="recommend-title">
        <div className="title1">
          <button
            className={`will-like ${active ? "active" : ""}`}
            onClick={handleClick}
          >
            Có thể bạn sẽ thích
          </button>
        </div>
        <div className="title2">
          <button
            className={`will-like ${active ? "active" : ""}`}
            onClick={handleClick}
          >
            Đã xem gần đây
          </button>
        </div>
      </div>
      <div className="recommend-detail">
        {randomProducts.map((item) => (
          // Trong hàm render của component:
          <a
            href={`/detail/${item.ProductNo}`}
            onClick={() => window.location.reload()}
          >
            <ProductItems key={item.ProductNo} product={item} />
          </a>
        ))}
      </div>
    </div>
  );
}

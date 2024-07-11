import { useState } from "react";
import "./DetailProductDescription.css";

export default function DetailProductDescription({ product }) {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
    console.log("Expanded:", expanded);
console.log("Product Summary:", product?.ProductSummary);
  };

  const resetDescription = () => {
    setExpanded(false);
  };

  return (
    <div className="detail-product-description">
      {product && (
        <div className="description">
          <div className={`description-left ${expanded ? "expanded" : ""}`}>
            <h1>Mô tả sản phẩm</h1>
            <div className="p">
              <p>{product?.description}</p>
              {expanded && (
                <>
                  <p>{product?.fastdescription}</p>
                </>
              )}
            </div>
          </div>
          <div className={`description-right ${expanded ? "expanded" : ""}`}>
            <h1>Chi tiết sản phẩm</h1>
            <div className="attribute-product">
              <div className="attribute">
                <p>Đặc tính:</p>
                <p>Số lượng đóng gói:</p>
                <p>Khối lượng:</p>
                <p>Giá:</p>
                {expanded && <></>}
              </div>

              <div className="info-attribute">
                <p>{product.feature}</p>
                <p>{product.quantityp}</p>
                <p>{product.weight}</p>
                <p>{product.price} VND</p>
              </div>
            </div>
          </div>
          {expanded && (
            <button className="collapse-btn" onClick={resetDescription}>
              Thu gọn
            </button>
          )}
          {!expanded && (
            <a className="expand-btn" onClick={toggleDescription}>
              Xem thêm
            </a>
          )}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

import { formatPrice } from "../../utils/formatPrice";

function CartItem({ item, setCart }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/carts-items/${item._id}`)
      .then((res) => {
        console.log(res.data);
        // Cập nhật lại danh sách giỏ hàng sau khi xóa
        setCart((prev) => prev.filter((cartItem) => cartItem._id !== item._id));
      })
      .catch((err) => console.log(err));
  };
  console.log("test:  "+item.quantity);
  console.log("test2:  "+quantity);
  console.log("test3:  "+item._id);
  useEffect(() => {
    let intervalId;
    if (quantity !== item.quantity) {
      intervalId = setTimeout(() => {
        axios
          .put(`http://localhost:8080/api/carts-items/${item._id}`, {
            quantity: quantity,
          })
          .then((res) => {
            console.log(res.data);
            setCart((prev) => {
              return prev.map((i) => {
                if (i._id === item._id) {
                  return {
                    ...i,
                    quantity: quantity,
                  };
                } else {
                  return i;
                }
              });
            });
          })
          .catch((err) => console.log(err));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [quantity, item.quantity]);


  return (
    <div className="item-cart">
      <div className="img-item">
        <img
          src={"http://localhost:8080" + item.product.images[0].path}
          alt={item.product.name}
        />
      </div>
      <div className="itemList-detail">
        <div className="des-item">{item.product.name}</div>
        <div className="more-infor">
          <div>
            <p className="type-product">
              <span className="label">Loại sản phẩm:</span>
              <span className="pref-item">{item.product.type}</span>
            </p>
            <p className="quantity-product">
              <span className="label">Số lượng sản phẩm còn lại:</span>
              <span className="pref-item">{item.product.quantity}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="quantity-item">
        <button
          onClick={(e) => {
            if (quantity > 1) {
              if(item.product.quantity >0){
                
              setQuantity((prev) => prev - 1);
            }
          }
          }}
        >
          -
        </button>
        <input
          min="1"
          max="99"
          type="number"
          width="30px"
          value={quantity}
          readOnly
        />
        <button
          className="btn-add"
          onClick={(e) => {
            if (quantity < item.product.quantity) {
              setQuantity((prev) => prev + 1);
            }
          }}
        >
          + 
        </button>
        
      </div>
      <div className="price-item">
        <p>
          <span className="label">Giá:</span>
          <span>{formatPrice(item.product.price)}</span>
        </p>
        <div className="remove-item" onClick={handleDelete}>
          Xoá{" "}
        </div>
      </div>
    </div>
  );
}

export default CartItem;

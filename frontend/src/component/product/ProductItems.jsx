const ProductItem = ({ product }) => {
  const formattedPrice = product.price.toLocaleString("vi-VN");
  console.log(product.images);
  return (
    <div className="ProductItems">
      <div className="product-top">
        <div className="product-image">
          <img
            src={"http://localhost:8080" + product.images[0].path}
            alt={product.name}
          />
        </div>
        <div className="product-name">{product.name}</div>
        <div className="product-description">{product.type}</div>
      </div>
      <div className="product-bot">
        <div className="product-price">{formattedPrice} VND</div>
      </div>
    </div>
  );
};

export default ProductItem;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductItems = () => {
//     // const [products, setProducts] = useState([]);

//     // useEffect(() => {

//     // }, []);

//     return (
//         <div className='ProductItems'>
//             {products.map(product => (
//                 <div key={product._id} className='product-item'>
//                     <div className='product-name'>{product.name}</div>
//                     <div className='product-description'>{product.description}</div>
//                     <div className='product-price'>{product.price}</div>
//                     {/* Hiển thị các thông tin sản phẩm khác nếu cần */}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ProductItems;

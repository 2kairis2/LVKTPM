import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DetailProductDescription from "./DetailProductDescription";
import DetailProductSale from "./DetailProductSale";
import DetailProductPolicy from "./DetailProductPolicy";
// import DetailProductRecommend from "./DetailProductRecommend";

export default function DetailProductBody() {
  const { ProductNo } = useParams();
  const [product, setProduct] = useState();
  //update

  useEffect(() => {
    axios.get("http://localhost:8080/api/products/" + ProductNo).then((res) => {
      setProduct(res.data.data);
    });
  }, [ProductNo]);
  // console.log(product, ProductNo);
  return (
    <div className="detail-product-body">
      {product && (
        <>
          <DetailProductSale product={product} />
          <DetailProductDescription product={product} />
          <DetailProductPolicy />
          {/* <DetailProductRecommend product={product} /> */}
        </>
      )}
    </div>
  );
}

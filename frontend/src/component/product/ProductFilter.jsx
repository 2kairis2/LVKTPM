import React, { useState, useEffect } from "react";
import "./ProductFilter.css";
import { ProductData } from "../../common/json/ProductData";
import ProductItems from "./ProductItems";
import { Link, useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import { getFormControlLabelUtilityClasses } from "@mui/material";

const typeProduct = {
  "00001": "Hạt giống",
  "00002": "Rau củ",
  "00003": "Cây cảnh",
  "00005": "Phân bón",
  "00006": "Thuốc trừ sâu",
  "00004": "Dụng cụ thủy canh",
};

export default function ProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const feature = searchParams.get("feature");

  const [isOpenCharacteristic, setIsOpenCharacteristic] = useState(false);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sort, setSort] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Construct the base URL
    const baseUrl = `${process.env.REACT_APP_SERVER_URL}/products/search`;

    // Construct query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("type", type);
    if (feature !== null) {
      queryParams.append("feature", feature);
    }
    // if (sort !== null) {
    //   queryParams.append('sort', sort);
    // }
    // Combine the base URL with the query parameters
    const url = `${baseUrl}?${queryParams.toString()}`;

    // Fetch products from the server
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          // If the request is successful, update the products state
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // if(sort===null&&feature===null)

    return () => {
      setSelectedCharacteristic(null);
    };
  }, [type, feature]);
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // useEffect(() => {
  //   // Lọc danh sách sản phẩm dựa trên selectedCharacteristic
  //   if (selectedCharacteristic) {
  //     const filtered = products.filter(product => product.feature === selectedCharacteristic);
  //     setFilteredProducts(filtered);
  //   } else {
  //     // Nếu không có selectedCharacteristic, hiển thị tất cả sản phẩm
  //     setFilteredProducts(products);
  //   }

  // }, [selectedCharacteristic,sort, products]);
  useEffect(() => {
    // Lọc danh sách sản phẩm dựa trên selectedCharacteristic
    let filteredProducts = [...products];

    if (selectedCharacteristic) {
      filteredProducts = filteredProducts.filter(
        (product) => product.feature === selectedCharacteristic
      );
    }

    // Sắp xếp danh sách sản phẩm theo giá nếu sort được chọn
    if (sort) {
      filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);

        if (sort === "asc") {
          return priceA - priceB;
        } else if (sort === "desc") {
          return priceB - priceA;
        }
        return 0;
      });
    }

    // Cập nhật state với danh sách sản phẩm đã lọc và sắp xếp
    setFilteredProducts(filteredProducts);
  }, [selectedCharacteristic, sort, products]);

  const handleSort = (e) => {
    const sortOrder = e.target.getAttribute("value");

    setSort(sortOrder);
    setIsOpenPrice(false);
  };
  const resetFilter = () => {
    setFilteredProducts(products);

    setSort(null);
    setSelectedCharacteristic(null); // Xoá trạng thái được chọn
  };

  const toggleDropdownCharacteristic = () => {
    setIsOpenCharacteristic(!isOpenCharacteristic);
    setIsOpenPrice(false);
  };

  const toggleDropdownPrice = () => {
    setIsOpenPrice(!isOpenPrice);
    setIsOpenCharacteristic(false);
  };
  // const filterByCharacteristicAndPrice = (characteristic, priceRange) => {
  //   const filtered = ProductData.filter((product) => {
  //     const meetsCharacteristicCondition =
  //       !characteristic || product.ProductCharacteristic === characteristic;
  //     const meetsPriceCondition =
  //       !priceRange || meetsPriceRange(product.ProductPrice, priceRange);
  //     return meetsCharacteristicCondition && meetsPriceCondition;
  //   });
  //   setFilteredProducts(filtered);
  // };

  // const meetsPriceRange = (productPrice, priceRange) => {
  //   const price = parseInt(productPrice.replace("vnd", "").trim());

  //   if (priceRange === "0 - 50.000") {
  //     return price <= 50000;
  //   } else if (priceRange === "50.000 - 100.000") {
  //     return price > 50000 && price <= 100000;
  //   } else if (priceRange === "> 100000") {
  //     return price > 100000;
  //   }
  //   return false; // Trả về true nếu không có khoảng giá nào được chọn
  // };

  const selectCharacteristic = (characteristic) => {
    setSelectedCharacteristic(characteristic);
    setIsOpenCharacteristic(false);
    const filtered = products.filter(
      (product) => product.feature === selectedCharacteristic
    );
    setFilteredProducts(filtered);
    // filterByCharacteristicAndPrice(characteristic, selectedPrice);
  };

  // const selectPrice = (priceRange) => {
  //   setSelectedPrice(priceRange);
  //   setIsOpenPrice(false);
  //   filterByCharacteristicAndPrice(selectedCharacteristic, priceRange);
  // };

  const handleTransitionEnd = () => {
    // Thực hiện các hành động mong muốn khi dropdown menu đã hoàn thành hiệu ứng transition và mở ra.
  };

  // const handleProductSelection = (product) => {
  //   setSelectedProduct(product);
  // };

  const clearSelectedProduct = () => {
    setSelectedCharacteristic(null);
    setFilteredProducts(products); // Cập nhật lại danh sách sản phẩm khi xóa giá trị được chọn
  };

  const clearSelectedPrice = () => {
    setSort(null);
    setFilteredProducts(products); // Cập nhật lại danh sách sản phẩm khi xóa giá trị được chọn
  };

  const uniqueFeatures = [
    ...new Set(products.map((product) => product.feature)),
  ];
  console.log(sort);
  return (
    <div className="ProductFilter">
      <div className="filter-container">
        <div className="filter-by">
          <p>LỌC THEO</p>
        </div>
        <div
          className={`dropdown${isOpenCharacteristic ? " open" : ""}`}
          onTransitionEnd={handleTransitionEnd}
        >
          <button
            className="dropdown-toggle"
            onClick={toggleDropdownCharacteristic}
          >
            ĐẶC TÍNH <span className="arrow">&#9662;</span>
          </button>
          {isOpenCharacteristic && (
            <ul className="dropdown-menu">
              {uniqueFeatures.map((feature, index) => (
                <li
                  key={index}
                  onClick={() => {
                    selectCharacteristic(feature);
                    // handleProductSelection(product); // Bạn có thể không cần thiết nếu không cần chọn sản phẩm khi chọn tính năng
                  }}
                >
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className={`dropdown${isOpenPrice ? " open" : ""}`}
          onTransitionEnd={handleTransitionEnd}
        >
          <button className="dropdown-toggle" onClick={toggleDropdownPrice}>
            GIÁ <span className="arrow">&#9662;</span>
          </button>
          {isOpenPrice && (
            <ul className="dropdown-menu1">
              <li onClick={handleSort} value="asc">
                Tăng dần
              </li>
              <li value="desc" onClick={handleSort}>
                Giảm dần
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="result-container">
        <div className="show-by">
          <p>HIỂN THỊ THEO:</p>
        </div>
        {selectedCharacteristic && (
          <div className="selected-product-container">
            <p>{selectedCharacteristic}</p>
            <button className="clear-button" onClick={clearSelectedProduct}>
              X
            </button>
          </div>
        )}
        {sort && (
          <div className="selected-price-container">
            <p>{sort === "asc" ? "Tăng dần" : "Giảm dần"}</p>
            <button className="clear-button" onClick={clearSelectedPrice}>
              X
            </button>
          </div>
        )}
        <div className="reset-all">
          <button className="btn-reset" onClick={resetFilter}>
            ĐẶT LẠI
          </button>
        </div>
      </div>

      <div>
        {/* className={`ProductReview ${expanded ? "expanded" : ""}` */}
        <div className="title-review">
          <p>{products.length} SẢN PHẨM</p>
          {/* <p>{filteredProducts.length} SẢN PHẨM</p> */}
        </div>
        <div className="product-container">
          {/* Chia danh sách sản phẩm thành các phần, mỗi phần chứa productsPerRow sản phẩm */}
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-row">
              <Link to={`/detail/${product._id}`}>
                <ProductItems product={product} />
              </Link>
            </div>
          ))}
        </div>
        {/* {!expanded && (
          <button className="expand-btn" onClick={handleShowMore}>
            Xem thêm
          </button>
        )}
        {expanded && (
          <button className="collapse-btn" onClick={resetDescription}>
            Thu gọn
          </button>
        )} */}
      </div>
    </div>
  );
}

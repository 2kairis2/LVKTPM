import React, { useEffect, useState } from "react";
import "./Cards.css";
import { cardsData } from "../../Data/Data";
import axios from "axios";

import Card from "../Card/Card";

const Cards = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProductSales, setTotalProductSales] = useState(0);
  const serverApi = process.env.REACT_APP_SERVER_URL;
  const [series, setSeries] = useState([]);
  const [totalOrderSeries, setTotalOrderSeries] = useState([]);
  const [totalProductSeries, setTotalProductSeries] = useState([]);

  async function getOrders() {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
    const data = await axios.get(serverApi + "/orders").then((res) => {
      const filteredData = res.data.filter(order => {
        const createdAtDate = new Date(order.createdAt);
        return createdAtDate >= startOfMonth && createdAtDate <= endOfMonth;
      });
      
      const dateWiseRevenue = {};
      const dateWiseOrders = {};
      const dateWiseProductSales = {};

      const currentDateKey = startOfMonth.toISOString().split('T')[0]; 
      let currentDateCursor = new Date(startOfMonth);
      while (currentDateCursor <= endOfMonth) {
        const dateKey = currentDateCursor.toISOString().split('T')[0];
        dateWiseRevenue[dateKey] = 0;
        dateWiseOrders[dateKey] = 0;
        dateWiseProductSales[dateKey] = 0;
        currentDateCursor.setDate(currentDateCursor.getDate() + 1); 
      }

      filteredData.forEach(order => {
        const createdAtDate = new Date(order.createdAt);
        const dateKey = createdAtDate.toISOString().split('T')[0]; 
        const revenue = order.total * 1000; 
        dateWiseRevenue[dateKey] += revenue;
        dateWiseOrders[dateKey] += 1;
        order.items.forEach(item => {
          dateWiseProductSales[dateKey] += item.product.saleCount;
        });
      });

      const revenueArray = Object.values(dateWiseRevenue);
      const orderArray = Object.values(dateWiseOrders);
      const productSalesArray = Object.values(dateWiseProductSales);

      const seriesData = [{
        name: "Doanh Thu",
        data: revenueArray
      }];
      const totalOrderSeriesData = [{
        name: "Đơn hàng",
        data: orderArray
      }];
      const totalProductSeriesData = [{
        name: "Sản phẩm",
        data: productSalesArray
      }];

      setSeries(seriesData);
      setTotalOrderSeries(totalOrderSeriesData);
      setTotalProductSeries(totalProductSeriesData);

      const totalRevenue = filteredData.map(order => order.total).reduce((a, b) => a + b, 0) * 1000;
      setTotalRevenue(totalRevenue);
      const totalOrders = filteredData.length;
      setTotalOrders(totalOrders);
      const totalProductSales = filteredData.reduce((total, order) => {
        order.items.forEach(item => {
            total += item.product.saleCount;
        });
        return total;
      }, 0);
      setTotalProductSales(totalProductSales);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getOrders();
    
  }, []);

  return (
    <div className="Cards">
      <div className="parentContainer">
        <Card 
          title="Doanh thu"
          color={
            {
              backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
              boxShadow: "0px 10px 20px 0px #e0c6f5",
            }
          }
          value={totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          png={cardsData[0].png}
          series={series}
        />
      </div>

      <div className="parentContainer">
        <Card 
          title="Đơn hàng"
          color={
            {
              backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
              boxShadow: "0px 10px 20px 0px #FDC0C7",
            }
          }
          value={totalOrders}
          png={cardsData[1].png}
          series={totalOrderSeries}

        />
      </div>

      <div className="parentContainer">
        <Card 
          title="Sản phẩm"
          color={
            {
              backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
              boxShadow: "0px 10px 20px 0px #F9D59B",
            }
          }
          value={totalProductSales}
          png={cardsData[2].png}
          series={totalProductSeries}
        />
      </div>

    </div>
  );
};

export default Cards;

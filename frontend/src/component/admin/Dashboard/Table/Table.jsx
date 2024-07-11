import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import  Paper   from "@mui/material/Paper";
import "./Table.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const makeStyle=(status)=>{
  if(status === 1)
  {
    return {
      background: ' rgb(252, 229, 233)',
      color: 'black',
    }
  }
  else if(status === 2)
  {
    return{
      background: ' rgb(252, 229, 233)',
      color: 'black',
    }
  }
  else if(status === 3)
  {
    return{
      background: ' rgb(252, 229, 233)',
      color: 'black',
    }
  }
  else if(status === 4)
  {
    return {
      background: " rgb(252, 229, 233)",
      color: "black",
    };
  }
}

export default function BasicTable() {

  const serverApi = process.env.REACT_APP_SERVER_URL;
  const [orders, setOrders] = useState([]);

  async function getOrders() {
    try {
      const response = await axios.get(serverApi + "/orders");
      const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const recentOrders = sortedOrders.slice(0, 5);
      setOrders(recentOrders);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
      <div className="Table">
      <h3>Đơn hàng gần đây</h3>
        <TableContainer
          // component={Paper}
          // style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell align="left">Mã đơn</TableCell>
                <TableCell align="left">Ngày lập đơn</TableCell>
                <TableCell align="left">Trạng thái</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {orders.length > 0 && orders.map((order, index) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {order.items && order.items.map((item) => (
                      <div key={item._id}>
                        {item.product.name}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="left">{order._id}</TableCell>
                  <TableCell align="left">
                    {new Date(order.createdAt).toLocaleDateString('en-GB')}
                  </TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(order.status)}>{order.status === 1 ? "Đã xác nhận" : order.status === 2 ? "Đã giao hàng" : order.status === 3 ? "Đã gửi hàng" : "Chưa được xác nhận"}</span>
                  </TableCell>
                  <TableCell align="left" className="Details"><Link to={`/orderdetail?orderId=${order._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>Details</Link></TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import url from "./GlobalVar";

function UserOrder() {
  const [orders, setOrders] = useState([]);
  const user1 = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = user1?.userId;
  const navigate = useNavigate();

  useEffect(() => {
    refreshOrders();
  }, []);

  function cancleOrder(order) {
    fetch(`${url}/order/${order.orderId}/cancle`, {
      method: "POST",
    }).then(() => refreshOrders());
  }
  function refreshOrders() {
    fetch(`${url}/order`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => {
      r.json().then((j) => setOrders(j));
    });
  }
  return (
    <div className="container">
      <h3 className="p-3 text-center">List of Orders</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Total Price With GST</th>
            <th>Order Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.address}</td>
              <td>{order.product.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice}</td>
              <td>{order.totalPriceWithGST}</td>
              <td>{order.orderStatus}</td>
              <Button
                onClick={() => cancleOrder(order)}
                style={{ backgroundColor: "red" }}
              >
                Cancel
              </Button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserOrder;

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import url from "./GlobalVar";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    refreshOrders();
  }, [page]);

  function cancleOrder(order) {
    fetch(`${url}order/${order.orderId}/cancle`, {
      method: "POST",
    }).then(() => refreshOrders());
  }
  function refreshOrders() {
    fetch(`${url}/orders?page=${page}&size=2`).then((r) => {
      r.json().then((j) => {
        setOrders(j.content);
        setTotalPages(j.totalPages);
      });
    });
  }
  function prevPage() {
    setPage(page - 1);
  }
  function nextPage() {
    setPage(page + 1);
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
      <div className="text-center">
        <Button disabled={page === 0} onClick={prevPage}>
          Prev
        </Button>
        <Button disabled={page === totalPages - 1} onClick={nextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default OrderList;

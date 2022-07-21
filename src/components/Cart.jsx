import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import url from "./GlobalVar";

function Cart() {
  const [cart, setCart] = useState([]);
  const user1 = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = user1?.userId;
  const navigate = useNavigate();

  useEffect(() => {
    refreshCart();
  }, []);

  function removeCartItem(cart) {
    fetch(`${url}/cart/userItem/${cart.productId}`, {
      method: "DELETE",
    }).then(() => refreshCart());
  }
  function refreshCart() {
    fetch(`${url}/cart/userCart`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => {
      r.json().then((j) => setCart(j));
    });
  }
  return (
    <div className="container">
      <h3 className="p-3 text-center">User Cart</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cart) => (
            <tr key={cart.productId}>
              <td>{cart.product.productId}</td>
              <td>{cart.product.productName}</td>
              <td>{cart.quantity}</td>
              <Button
                onClick={() => removeCartItem(cart)}
                style={{ backgroundColor: "red" }}
              >
                Delete
              </Button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;

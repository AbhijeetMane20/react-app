import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import url from "./GlobalVar";

function Cart() {
  const [cart, setCart] = useState([]);
  console.log(cart)

  const [quantities, setQuantities] = useState([]);
  

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    refreshCart();
  }, []);

  function removeCartItem(cartItem) {
    console.log(cartItem);
    fetch(`${url}/cart/cartItem/${cartItem.product.productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => refreshCart());
  }
  function refreshCart() {
    fetch(`${url}/cart/userCart`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => {
      r.json().then((resonse) => {
        const allCart = resonse.cartItems;
        setCart(allCart);
        const allQuantities = resonse.cartItems.map((cartItem) => cartItem.quantity);
        setQuantities(allQuantities);
        
      });
    });
    
  }
  function quantityDec(cartItem, index) {
    changeQuantity(cartItem, index, -1);
  }
  function quantityInc(cartItem,index) {
    changeQuantity(cartItem,index, 1);
  }

function changeQuantity(cartItem, index, delta) {
  var newArray = [...quantities];
  const newQuantity = quantities[index] + delta;
  newArray[index] = newQuantity;
  setQuantities(newArray);
  fetch(`${url}/cart/updateCart/${cartItem.cartItemId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    // the data to send
    body: JSON.stringify({
      productId : cartItem.product.productId,
      quantity: newQuantity
      
    })
    
  }).then(() => refreshCart());
  
}

  function checkout() {
    if (userId) {
      // navigate(`/addOrder/${product.productId}`);
      
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  }
  return (
    <div className="container">
      <h3 className="p-3 text-center">User Cart</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Product Price</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cartItem, index) => (
            <tr key={cartItem.cartItemId}>
              <td>{cartItem.product.productName}</td>
              <td>
                <div>
                  {quantities[index]}{" "}
                  <Button onClick={() => quantityDec(cartItem, index)}>-</Button>
                  <Button onClick={() => quantityInc(cartItem, index)}>+</Button>
                </div>
              </td>

              <td>{cartItem.product.productPrice}</td>
              <td>{cartItem.totalPrice}</td>
              <td>
                <Button
                  onClick={() => removeCartItem(cartItem)}
                  style={{ backgroundColor: "red" }}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <Button onClick={checkout}>Checkout</Button>
      </div>
    </div>
  );
}

export default Cart;

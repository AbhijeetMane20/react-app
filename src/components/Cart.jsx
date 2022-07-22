import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import url from "./GlobalVar";

function Cart() {
  const [cart, setCart] = useState([]);
  console.log(cart)
  const [quantities, setQuantities] = useState([]);
  
  
  console.log(quantities)

  const token = localStorage.getItem("token");


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
      r.json().then((items) => {
        setCart(items);
        const allQuantities = items.map((cartItem) => (cartItem.quantity));
        setQuantities(allQuantities)
        
        
      });
    });
  }
  function quantityDec(index) {
    // const x = quantities[index]-1;
    // setQuantities(x);
    var newArray = [...quantities];
    newArray[index] = quantities[index]-1;
    setQuantities(newArray);
    console.log("*****")
   }
  function quantityInc() {
    setQuantities(quantities+1);
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cartItem,index) => (
            <tr key={cartItem.cartItemId}>
              <td>{cartItem.product.productName}</td>
              <td>
                <div>
              {quantities[index]} <Button onClick={() => quantityDec(index)}>-</Button>
                <Button onClick={quantityInc}>+</Button>
                </div>
              </td>
              
              <td>{cartItem.product.productPrice}</td>
              <td>
              <Button
                onClick={() => removeCartItem(cart)}
                style={{ backgroundColor: "red" }}
              >
                Delete
              </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;

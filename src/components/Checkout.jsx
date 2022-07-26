import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import url from "./GlobalVar";

function Checkout() {
    const [cart, setCart] = useState([]);
    console.log(cart)

  const [quantities, setQuantities] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const { register, getValues } = useForm();
  console.log(totalPrice)

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    refreshCart();
  }, []);

 
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
        const totalPrice = resonse.totalPrice;
        setTotalPrice(totalPrice);
      });
    });
  }
  function placeOrder() {
    const formValues = getValues();
    const requestBody = {
      productId: cart.product.productId,
      quantity: cart.quantity,
      customerName: formValues.customerName,
      address: formValues.address,
    };
   
    fetch(`${url}/order`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      // the data to send
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((order) => navigate(`/orderReciept/${order.orderId}`));
  }
  function goBack() {
    navigate(-1);
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
          </tr>
        </thead>
        <tbody>
          {cart.map((cartItem, index) => (
            <tr key={cartItem.cartItemId}>
              <td>{cartItem.product.productName}</td>
              <td>
                  {quantities[index]}
              </td>

              <td>{cartItem.product.productPrice}</td>
            </tr>
            
          ))}
        </tbody>
      </table>
      <thead>

      
        <th>Total Price  :  {totalPrice}/-</th>
                
            
            </thead>
     
      <div>
    <Form>
    <Form.Label>Customer Name</Form.Label>
    <Form.Control
      placeholder="Customer Name"
      {...register("customerName")}
    />
    <Form.Label>Customer Address</Form.Label>
    <Form.Control placeholder="Address" {...register("address")} />
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button onClick={placeOrder} variant="primary">
      Buy
    </Button>
    <Button style={{ float: "right" }} variant="primary" onClick={goBack}>
      Back
    </Button>
  </Form></div>
    </div>
    
  )
}

export default Checkout
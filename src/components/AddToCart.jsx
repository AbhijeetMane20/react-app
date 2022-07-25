import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import url from "./GlobalVar";

function AddToCart() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { register, getValues } = useForm();

  const { id } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${url}/product/` + id).then((r) => {
      r.json().then((j) => setProduct(j));
    });
  }, [id]);

  function addToCart() {
    const formValues = getValues();
    const requestBody = {
      productId: id,
      quantity: formValues.quantity,
    };

    fetch(`${url}/cart/addToCart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      // the data to send
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then(() => navigate("/"));
  }
  function goBack() {
    navigate(-1);
  }

  return (
    <div>
      {!product ? (
        <div>Loading</div>
      ) : (
        <Form>
          <Form.Label>Product Name</Form.Label>
          <Form.Control value={product.productName} disabled />
          <Form.Label>Product Price</Form.Label>
          <Form.Control value={product.productPrice} disabled />
          <Form.Label>Quantity</Form.Label>
          <Form.Control placeholder="Quantity" {...register("quantity")} />
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button onClick={addToCart} variant="primary">
            Add To Cart
          </Button>
          <Button style={{ float: "right" }} variant="primary" onClick={goBack}>
            Back
          </Button>
        </Form>
      )}
    </div>
  );
}

export default AddToCart;

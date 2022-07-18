import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddProduct() {
  const navigate = useNavigate();
  const { register, getValues } = useForm();

  function addProduct() {
    const formValues = getValues();
    const requestBody = {
      productName: formValues.productName,
      productPrice: formValues.productPrice,
      productDescription: formValues.productDescription,
      productImage: formValues.productImage,
    };
    // navigate("/", { replace: true });
    // console.log(getValues());
    fetch("http://localhost:8080/product", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // the data to send
      body: JSON.stringify(requestBody),
    }).then(() => navigate("/"));
  }
  function goBack() {
    navigate(-1);
  }

  //   function onQuantityChanged(event) {
  //     const quantity = event.target.value;
  //     setQuantity(quantity);
  //     console.log(quantity);
  //   }

  return (
    <div>
      <Form>
        <Form.Label>Product Name</Form.Label>
        <Form.Control placeholder="Product Name" {...register("productName")} />
        <Form.Label>Product Price</Form.Label>
        <Form.Control
          placeholder="Product Price"
          {...register("productPrice")}
        />
        <Form.Label>Product Description</Form.Label>
        <Form.Control
          placeholder="Product Description"
          {...register("productDescription")}
        />
        <Form.Label>Product Image</Form.Label>
        <Form.Control placeholder="Image Url" {...register("productImage")} />
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button onClick={addProduct} variant="primary">
          Add Product
        </Button>
        <Button style={{ float: "right" }} variant="primary" onClick={goBack}>
          Back
        </Button>
      </Form>
    </div>
  );
}

export default AddProduct;

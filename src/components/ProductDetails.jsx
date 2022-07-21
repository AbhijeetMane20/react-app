import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import url from "./GlobalVar";

function ProductDetails() {
  // const product = props.product;
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  const { id } = useParams();
  useEffect(() => {
    fetch(`${url}/product/` + id).then((r) => {
      r.json().then((j) => setProduct(j));
    });
  }, [id]);
  
  function OnClickBuy() {
    if (userId) {
      navigate(`/addOrder/${product.productId}`);
      
    } else {
      navigate("/login");
    }
  }
  return (
    <div
      style={{
        padding: "2rem 5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!product ? (
        <div>Loading</div>
      ) : (
        <Card className="card cardalign" style={{ width: "50%" }}>
          <Card.Img
            className="rounded mx-auto d-block"
            variant="top"
            style={{ width: "10rem" }}
            src={product.productImage}
          />
          <Card.Body>
            <Card.Title>{product.productName}</Card.Title>
            <Card.Text>{product.productDescription}</Card.Text>
            <Card.Text>{product.productPrice} /-</Card.Text>
            <Button className="rounded mx-auto d-block" onClick={OnClickBuy}>
              Buys
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default ProductDetails;

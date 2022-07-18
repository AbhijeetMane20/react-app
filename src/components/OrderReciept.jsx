import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function OrderReciept() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:8080/order/" + id).then((r) => {
      r.json().then((j) => setOrder(j));
    });
  }, [id]);

  function backHome() {
    navigate("/");
  }

  return (
    <div>
      {!order ? (
        <div>Loading</div>
      ) : (
        <Card style={{ width: "50%" }}>
          <Card.Body>
            <Card.Title>
              <h1>Payment Details</h1>
            </Card.Title>
            <Card.Text>
              <h4>Customer Name :</h4> {order.customerName}
            </Card.Text>
            <Card.Text>
              <h4>Customer address :</h4> {order.address}
            </Card.Text>
            <Card.Text>
              <h4>OrderStatus :</h4> {order.orderStatus}
            </Card.Text>
            <Card.Text>
              <h4>TotalPrice :</h4> {order.totalPrice}
            </Card.Text>
            <Card.Text>
              <h4>TotalPriceWithGST :</h4> {order.totalPriceWithGST}
            </Card.Text>

            <Button onClick={backHome} variant="primary">
              Continue Shopping
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default OrderReciept;

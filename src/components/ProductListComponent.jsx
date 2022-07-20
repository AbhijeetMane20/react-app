import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import url from "./GlobalVar";
function ProductListComponent() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  // const [selectedProduct, setSelectedProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    refreshList();
  }, [page]);

  function refreshList() {
    fetch(
      `${url}/products?page=${page}&size=6`
    ).then((r) => {
      r.json().then((j) => {
        setProducts(j.content);
        setTotalPages(j.totalPages);
      });
    });
  }
  function onByClicked(product) {
    navigate(`/product/${product.productId}`);
  }
  function prevPage() {
    setPage(page - 1);
  }
  function nextPage() {
    setPage(page + 1);
  }

  return (
    <div style={{ padding: "2rem 5rem" }}>
      {/* <h1 /> */}
      {/* {selectedProduct ? (
        <ProductDetails product={selectedProduct} />
      ) : ( */}
      <Row xs={1} md={3} className="g-4">
        {products.map((product) => (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>{product.productPrice} /-</Card.Text>
                <Button onClick={() => onByClicked(product)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* )} */}
      <br></br>
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

export default ProductListComponent;

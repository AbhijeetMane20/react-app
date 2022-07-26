import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import User from "./User";
function NavbarIndex() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Ecom</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/addProduct">Add Product</Nav.Link>
              <Nav.Link href="/orders">Orders</Nav.Link>
              <Nav.Link href="/userOrder">User Order</Nav.Link>
              <Nav.Link href="/cart">Cart</Nav.Link>
              <Navbar.Text>
                {" "}
                <User />{" "}
              </Navbar.Text>
              <Nav.Link onClick={logOut}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarIndex;

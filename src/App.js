import "./App.css";
import ProductListComponent from "./components/ProductListComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddOrder from "./components/AddOrder";
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import NavbarIndex from "./components/NavbarIndex";
import OrderReciept from "./components/OrderReciept";
import OrderList from "./components/OrderList";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserOrder from "./components/UserOrder";

function App() {
  
  return (
    <div className="app-container">
      <BrowserRouter>
        <NavbarIndex />
        <Routes>
          <Route path="/" element={<ProductListComponent />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/addOrder/:id" element={<AddOrder />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/orderReciept/:id" element={<OrderReciept />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userOrder" element={<UserOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

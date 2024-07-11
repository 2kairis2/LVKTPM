import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/home/HomePage";
import LoginContainer from "./pages/login/LoginContainer";
import LoginPage from "./pages/login/LoginPage";
import RegisterOage from "./pages/login/Resgi";
import ProductPage from "./pages/product/ProductPage";
import DetailProductPage from "./pages/product/DetailProductPage";
import AccountPage from "./pages/Account/AccountPage";

import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import OrderSection from "./component/manage/order/OrderSection";
import AdminPage from "./pages/Admin/AdminPage";
import IntroductionPage from "./pages/home/IntroductionPage";
import EditProduct from "./component/manage/products/EditProduct";
import AddProduct from './component/manage/products/AddProduct';
import PaymentMethod from "./component/order/PaymentMenthod";
import InvoicePage from "./pages/Invoice/InvoicePage";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/introduction" element={<IntroductionPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/register" element={<RegisterOage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/payment" element={<PaymentMethod />} />
          <Route path="/invoice" element={<InvoicePage />} />

          <Route path="/product/search" element={<ProductPage />} />
          <Route path="/detail/:ProductNo" element={<DetailProductPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editProduct/:id" element={<EditProduct />} />
          <Route path="/orderdetail" element={<OrderSection />} />
          <Route path="/admin/addProduct/:id" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;

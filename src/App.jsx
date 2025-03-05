import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from './Layout/Layout';
import BiddingPage from './pages/BiddingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import MyBids from './pages/MyBids';
import AllOrders from './pages/AllOrders';
import AddAdmin from './pages/AddAdmin';
import AddCategory from './pages/AddCategory';
import AllCategory from './pages/AllCategory';
import UpdateCategory from './components/UpdateCategory';
import Allproducts from './pages/AllProduct';
import AllCustomers from './pages/AllCustomer';
import AllDelivery from './pages/AllDelivery';
import SellerOrder from './pages/SellerOrder';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="my_bids" element={<MyBids />} />
          <Route path="my_orders" element={<AllOrders />} />
          <Route path="new_admin" element={<AddAdmin />} />
          <Route path="add_category" element={<AddCategory />} />
          <Route path="all_category" element={<AllCategory />} />
          <Route path="/update" element={<UpdateCategory />} />
          <Route path="/all_product" element={<Allproducts />} />
          <Route path="/view_customers" element={<AllCustomers />} />
          <Route path="/all_delivery" element={<AllDelivery />} />
          <Route path="/seller_orders" element={<SellerOrder />} />
          <Route path="/:id" element={<BiddingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

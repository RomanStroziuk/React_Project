import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import SneakerListPage from "../pages/SneakerList/SneakerListPage";
import UsersPage from "../pages/Users/UsersPage";
import Layout from "../common/components/Layout/Layout";
import Login from "../pages/Login/Login";
import BrandPage from "../pages/SneakerList/pages/BrandPage/BrandPage";
import CategoryPage from "../pages/SneakerList/pages/CategoryPage/CategoryPage";
import RolePage from "../pages/Users/pages/RolePage/RolePage";
import OrderPage from "../pages/Order/OrderPage";
import StatusPage from "../pages/Order/pages/StatusPage/StatusPage";
import WarehousePage from "../pages/Warehouse/WarehousePage";
import SneakerWarehousePage from "../pages/Warehouse/pages/SneakerWarehousePage/SneakerWarehousePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="sneakers" element={<SneakerListPage />}>
            <Route path="brands" element={<BrandPage />} />
            <Route path="categories" element={<CategoryPage />} />
          </Route>
          <Route path="users" element={<UsersPage />}>
            <Route path="roles" element={<RolePage />} />
          </Route>
          <Route path="orders" element={<OrderPage />}>
            <Route path="status" element={<StatusPage />} />
          </Route>
          <Route path="warehouses" element={<WarehousePage />}>
            <Route
              path="sneaker-warehouse"
              element={<SneakerWarehousePage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

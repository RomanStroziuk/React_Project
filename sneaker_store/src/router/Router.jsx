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
import WarehousePage from "../pages/Warehouse/pages/WarehousePage/WarehousePage";
import SneakerWarehousePage from "../pages/Warehouse/pages/SneakerWarehousePage/SneakerWarehousePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import WarehousePageLayout from "../pages/Warehouse/WarehousePageLayout";

const SneakersRoutes = () => (
  <Route path="sneakers" element={<SneakerListPage />}>
    <Route path="brands" element={<BrandPage />} />
    <Route path="categories" element={<CategoryPage />} />
  </Route>
);

const UsersRoutes = () => (
  <Route path="users" element={<UsersPage />}>
    <Route path="roles" element={<RolePage />} />
  </Route>
);

const OrdersRoutes = () => (
  <Route path="orders" element={<OrderPage />}>
    <Route path="status" element={<StatusPage />} />
  </Route>
);

const WarehousesRoutes = () => (
  <Route path="warehouses" element={<WarehousePageLayout />}>
    <Route index element={<WarehousePage />} />
    <Route path="sneaker-warehouse" element={<SneakerWarehousePage />} />
  </Route>
);

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {SneakersRoutes()}
          {UsersRoutes()}
          {OrdersRoutes()}
          {WarehousesRoutes()}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SneakerWarehousePage from "../pages/Warehouse/pages/SneakerWarehousePage/SneakerWarehousePage";
import SneakerListPage from "../pages/SneakerList/pages/SneakerListPage/SneakerListPage";
import WarehousePage from "../pages/Warehouse/pages/WarehousePage/WarehousePage";
import CategoryPage from "../pages/SneakerList/pages/CategoryPage/CategoryPage";
import SneakerListPageLayout from "../pages/SneakerList/SneakerListPageLayout";
import WarehousePageLayout from "../pages/Warehouse/WarehousePageLayout";
import BrandPage from "../pages/SneakerList/pages/BrandPage/BrandPage";
import StatusPage from "../pages/Order/pages/StatusPage/StatusPage";
import OrderPage from "../pages/Order/pages/OrderPage/OrderPage";
import UsersPage from "../pages/Users/pages/UserPage/UsersPage";
import RolePage from "../pages/Users/pages/RolePage/RolePage";
import OrderPageLayout from "../pages/Order/OrderPageLayout";
import UserPageLayout from "../pages/Users/UserPageLayout";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import Layout from "../common/components/Layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/Login/LoginPage";

const SneakersRoutes = () => (
  <Route path="sneakers" element={<SneakerListPageLayout />}>
    <Route
      index
      element={
        <ProtectedRoute allowedRoles={["Admin", "User"]}>
          <SneakerListPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="brands"
      element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <BrandPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="categories"
      element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <CategoryPage />
        </ProtectedRoute>
      }
    />
  </Route>
);

const UsersRoutes = () => (
  <Route
    path="users"
    element={
      <ProtectedRoute allowedRoles={["Admin"]}>
        <UserPageLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<UsersPage />} />
    <Route path="roles" element={<RolePage />} />
  </Route>
);

const OrdersRoutes = () => (
  <Route path="orders" element={<OrderPageLayout />}>
    <Route
      index
      element={
        <ProtectedRoute allowedRoles={["Admin", "User"]}>
          <OrderPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="status"
      element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <StatusPage />
        </ProtectedRoute>
      }
    />
  </Route>
);

const WarehousesRoutes = () => (
  <Route
    path="warehouses"
    element={
      <ProtectedRoute allowedRoles={["Admin"]}>
        <WarehousePageLayout />
      </ProtectedRoute>
    }
  >
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

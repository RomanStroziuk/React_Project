import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import SneakerListPage from "../pages/SneakerList/SneakerListPage";
import UsersPage from "../pages/Users/UsersPage";
import Layout from "../pages/Layout/Layout";
import Login from "../pages/Login/Login";
import BrandPage from "../pages/SneakerList/pages/BrandPage/BrandPage";
import CategoryPage from "../pages/SneakerList/pages/CategoryPage/CategoryPage";

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
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

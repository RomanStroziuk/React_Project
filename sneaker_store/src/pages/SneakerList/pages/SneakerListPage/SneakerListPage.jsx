import React from "react";
import { useLocation } from "react-router-dom";
import "./SneakerListPageStyle.css"; // Імпортуємо CSS файл


const SneakerListPage = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/sneakers" && <div>SneakerListPage</div>}
    </>
  );
};

export default SneakerListPage;

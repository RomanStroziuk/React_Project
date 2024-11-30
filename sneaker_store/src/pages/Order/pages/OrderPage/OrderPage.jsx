import React from "react";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();

  return (
    <>
      {/* Специфічний контент сторінки замовлень */}
      {location.pathname === "/orders" && <div>OrderPage</div>}
    </>
  );
};

export default OrderPage;

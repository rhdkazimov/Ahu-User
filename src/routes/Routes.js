import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../app/main/Home";
import { ROUTES } from "./const";
import Contact from "../app/components/Contact/Contact";
import ProductDetail from "../app/components/Home/ProductDetail/ProductDetail";
import { Products } from "../app/components/Shop/Products/Products";
import Login from "../app/auth/Login/Login";
import Register from "../app/auth/Register/Register";
import ForgotPassword from "../app/account/ForgotPassword";
import ResetPassword from "../app/account/ResetPassword";
import { ProtectedLoginRouter } from "../app/components/ProtectedLoginRouter";
import Order from "../app/components/Order/Order";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN.HOME} element={<Home />} />
      <Route path={ROUTES.CONTACT} element={<Contact />} />
      <Route path={ROUTES.PRODUCT.DETAIL} element={<ProductDetail />} />
      <Route path={ROUTES.SHOP} element={<Products />} />
      <Route
        path={ROUTES.USER.LOGIN}
        element={
          <ProtectedLoginRouter>
            <Login />
          </ProtectedLoginRouter>
        }
      />
      <Route path={ROUTES.USER.REGISTER} element={<Register />} />
      <Route path={ROUTES.USER.FORGOTPASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.USER.RESETPASSWORD} element={<ResetPassword />} />
      <Route path={ROUTES.ORDER} element={<Order />} />
    </Routes>
  );
};

export default AppRoutes;

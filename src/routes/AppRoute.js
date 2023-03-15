import AdminPage from "components/admin/AdminPage";
import LayoutPage from "components/layout/LayoutPage";
import BookDetailPage from "components/pages/BookDetailPage";
import CartPage from "components/pages/CartPage";
import CategoryPage from "components/pages/CategoryPage";
import CheckoutPage from "components/pages/CheckoutPage";
import HomePage from "components/pages/HomePage";
import LoginPage from "components/pages/LoginPage";
import RegisterPage from "components/pages/RegisterPage";
import { Route, Routes } from "react-router-dom";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route element={<LayoutPage></LayoutPage>}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/product-category"
          element={<CategoryPage></CategoryPage>}
        ></Route>
        <Route
          path="/product/:id"
          element={<BookDetailPage></BookDetailPage>}
        ></Route>
        <Route path="/cart" element={<CartPage></CartPage>}></Route>
        <Route path="/checkout" element={<CheckoutPage></CheckoutPage>}></Route>
      </Route>
      <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
    </Routes>
  );
};

export default AppRoute;

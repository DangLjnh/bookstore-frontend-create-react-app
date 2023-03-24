import AdminCategoriesCreate from "components/admin-action/AdminCategoriesCreate";
import AdminCategoriesUpdate from "components/admin-action/AdminCategoriesUpdate";
import AdminCreateProduct from "components/admin-action/AdminCreateProduct";
import AdminUpdateProduct from "components/admin-action/AdminUpdateProduct";
import AdminBill from "components/admin/AdminBill";
import AdminCategories from "components/admin/AdminCategories";
import AdminPage from "components/admin/AdminPage";
import AdminProduct from "components/admin/AdminProduct";
import AdminUser from "components/admin/AdminUser";
import LayoutPage from "components/layout/LayoutPage";
import BookDetailPage from "components/pages/BookDetailPage";
import CartPage from "components/pages/CartPage";
import CategoryPage from "components/pages/CategoryPage";
import CheckoutPage from "components/pages/CheckoutPage";
import HomePage from "components/pages/HomePage";
import LoginPage from "components/pages/LoginPage";
import RegisterAdminPage from "components/pages/RegisterAdminPage";
import RegisterPage from "components/pages/RegisterPage";
import { Route, Routes } from "react-router-dom";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route
        path="/admin/login"
        element={<RegisterAdminPage></RegisterAdminPage>}
      ></Route>
      <Route element={<LayoutPage></LayoutPage>}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/product-category" element={<CategoryPage></CategoryPage>}>
          <Route path=":id" element={<CategoryPage></CategoryPage>}></Route>
        </Route>

        <Route
          path="/product/:id"
          element={<BookDetailPage></BookDetailPage>}
        ></Route>
        <Route path="/cart" element={<CartPage></CartPage>}></Route>
        <Route path="/checkout" element={<CheckoutPage></CheckoutPage>}></Route>
      </Route>
      <Route
        path="/admin/categories"
        element={<AdminCategories></AdminCategories>}
      ></Route>
      <Route
        path="/admin/categories/create"
        element={<AdminCategoriesCreate></AdminCategoriesCreate>}
      ></Route>
      <Route
        path="/admin/categories/update/:id"
        element={<AdminCategoriesUpdate></AdminCategoriesUpdate>}
      ></Route>
      <Route
        path="/admin/products"
        element={<AdminProduct></AdminProduct>}
      ></Route>
      <Route
        path="/admin/products/create"
        element={<AdminCreateProduct></AdminCreateProduct>}
      ></Route>
      <Route
        path="/admin/products/update/:id"
        element={<AdminUpdateProduct></AdminUpdateProduct>}
      ></Route>
      <Route path="/admin/bills" element={<AdminBill></AdminBill>}></Route>
      <Route path="/admin/users" element={<AdminUser></AdminUser>}></Route>
    </Routes>
  );
};

export default AppRoute;

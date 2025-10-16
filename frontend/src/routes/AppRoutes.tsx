import UserLayout from "@/components/layout/UserLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import CategoryPage from "@/pages/user/CategoryPage";
import HomePage from "@/pages/user/HomePage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import UserSettingsLayout from "@/components/layout/UserSettingsLayout";
import ProfileSettingsPage from "@/pages/user/ProfileSettingsPage";
import AccountSettingsPage from "@/pages/user/AccountSettingsPage";
import ProductsPage from "@/pages/user/ProductsPage";
import ProductDetailsPage from "@/pages/user/ProductDetailsPage";
import WishlistPage from "@/pages/user/WishlistPage";
import CartCheckoutPage from "@/pages/user/CartCheckoutPage";
import OrderSuccessPage from "@/pages/user/SuccessPage";
import OrderFailurePage from "@/pages/user/FailurePage";
import ReviewsDetailsPage from "@/pages/user/ReviewsDetailsPage";
import OrderDetailsPage from "@/pages/user/OrderDetailsPage";
import ReportDetailsPage from "@/pages/user/ReportDetailsPage";
import ProfilePage from "@/pages/user/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route element={<ProtectedRoutes allowedRole="user" />}>
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartCheckoutPage />} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route path="/order/failure" element={<OrderFailurePage />} />
          <Route path="reviews" element={<ReviewsDetailsPage />} />
          <Route path="orders" element={<OrderDetailsPage />} />
          <Route path="reports" element={<ReportDetailsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="/settings" element={<UserSettingsLayout />}>
            <Route index element={<ProfileSettingsPage />} />
            <Route path="account" element={<AccountSettingsPage />} />
          </Route>
        </Route>
      </Route>

      {/* Authentication Routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AppRoutes;

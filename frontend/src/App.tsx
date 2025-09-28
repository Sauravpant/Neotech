import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./store/SearchContext";
import { MainLayout } from "./components/layout/MainLayout";
import Home from "./pages/user/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import CartPage from "./pages/user/CartPage";
import CategoriesPage from "./pages/user/CategoriesPage";
import CategoryProductsPage from "./pages/user/CategoryProductsPage";
import Orders from "./pages/user/Orders";
import Search from "./pages/user/Search";
import Error404 from "./pages/user/Error404";
import "./App.css";

const App = () => {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:slug" element={<CategoryProductsPage />} />
            <Route path="orders" element={<Orders />} />
            <Route path="search" element={<Search />} />
          </Route>
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/signup" element={<SignUp />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
};

export default App;

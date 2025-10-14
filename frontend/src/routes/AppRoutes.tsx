import UserLayout from "@/components/user/layout/UserLayout";
import HomePage from "@/pages/user/HomePage";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

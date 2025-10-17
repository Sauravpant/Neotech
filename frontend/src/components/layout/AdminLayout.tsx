import AdminSidebar from "../sidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <AdminSidebar>
      <Outlet />
    </AdminSidebar>
  );
};

export default AdminLayout;

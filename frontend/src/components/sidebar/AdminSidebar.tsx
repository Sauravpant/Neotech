import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  BarChart3,
  Package,
  Tag,
  ShoppingCart,
  Users,
  Flag,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

interface AdminSidebarProps {
  children: React.ReactNode;
}

const AdminSidebar = ({ children }: AdminSidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems = [
    { name: "Stats", icon: BarChart3, path: "/admin" },
    { name: "Products", icon: Package, path: "/admin/products" },
    { name: "Category", icon: Tag, path: "/admin/categories" },
    { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Reports", icon: Flag, path: "/admin/reports" },
  ];

  const getCurrentRouteName = () => {
    const currentItem = menuItems.find((item) => item.path === location.pathname);
    return currentItem ? currentItem.name : "Dashboard";
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const sidebarWidth = sidebarCollapsed ? "w-16" : "w-64";

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarWidth}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!sidebarCollapsed && <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>}
            <div className="flex items-center gap-2">
              <button onClick={toggleSidebar} className="hidden md:flex p-1 rounded-lg hover:bg-gray-100">
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-all duration-200 ${
                    isActive(item.path) ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  } ${sidebarCollapsed ? "justify-center" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </nav>

          <div className="p-3 border-t border-gray-200">
            <div className={`flex items-center gap-3 p-3 rounded-lg bg-gray-50 ${sidebarCollapsed ? "justify-center" : ""}`}>
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt={user.name} className="w-8 h-8 rounded-lg object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
              )}
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">Admin</p>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 mt-2 ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <LogOut className="w-4 h-4" />
              {!sidebarCollapsed && <span>Log Out</span>}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden flex items-center gap-3 p-4 bg-white border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="p-1 rounded-lg hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
        </div>

        <div className="hidden lg:flex bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Dashboard</span>
            <ChevronRightIcon className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{getCurrentRouteName()}</span>
          </div>
        </div>

        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminSidebar;

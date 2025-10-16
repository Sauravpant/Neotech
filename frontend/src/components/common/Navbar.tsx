import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Menu, X, Search, User, Settings, LogOut, Heart, ShoppingCart, Sun, Moon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchContext } from "@/context/SearchContext";
import { useTheme } from "@/context/ThemeContext";
import type { RootState } from "@/store/store";
import { useGetMyCart } from "@/hooks/user/useCart";
import { useGetMyWishlist } from "@/hooks/user/useWishlist";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "Categories", link: "/categories" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();
  const location = useLocation();

  const context = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate("/products");
    context?.setSearch(e.target.value);
  };

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  let cartLength = 0;
  let wishlistLength = 0;
  if (user && isAuthenticated) {
    const { data: cart } = useGetMyCart();
    const { data: wishlist } = useGetMyWishlist();
    cartLength = cart?.data?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
    wishlistLength = wishlist?.data?.products.length || 0;
  }
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-100 via-blue-50/30 to-slate-100 border-b border-slate-200/60 sticky top-0 z-50 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl mr-4 sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] bg-clip-text text-transparent hover:from-[#1D4ED8] hover:to-[#2563EB] transition-all duration-300 flex-shrink-0"
            >
              NeoTech
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`relative px-1 py-2 text-sm xl:text-lg font-medium transition-all duration-300 group ${
                  isActive(item.link) ? "text-[#2563EB] font-semibold" : "text-slate-600 hover:text-[#2563EB]"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] transition-all duration-300 ${
                    isActive(item.link) ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                ></span>
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-md mx-2 lg:mx-4 xl:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Products..."
                value={context?.search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-1.5 lg:py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-xs lg:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-slate-800 transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 sm:p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-[#2563EB]/30 hover:bg-white transition-all duration-300 cursor-pointer group shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 group-hover:text-[#2563EB] group-hover:scale-110 transition-transform" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 group-hover:text-[#2563EB] group-hover:scale-110 transition-transform" />
              )}
            </button>
            {isAuthenticated ? (
              <>
                <Link
                  to="/wishlist"
                  className="p-1.5 sm:p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-[#2563EB]/30 hover:bg-white transition-all duration-300 cursor-pointer group relative shadow-sm"
                >
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 group-hover:text-[#2563EB] group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                    {wishlistLength}
                  </span>
                </Link>
                <Link
                  to="/cart"
                  className="p-1.5 sm:p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-[#2563EB]/30 hover:bg-white transition-all duration-300 cursor-pointer group relative shadow-sm"
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 group-hover:text-[#2563EB] group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 bg-[#2563EB] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                    {cartLength}
                  </span>
                </Link>
                <div className="relative">
                  <Button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 rounded-full bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] p-0 overflow-hidden border border-[#2563EB]/30 hover:from-[#1D4ED8] hover:to-[#2563EB] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
                  >
                    <img
                      className="text-xs sm:text-sm text-white font-medium group-hover:scale-105 transition-transform"
                      src={user?.imageUrl || ""}
                      alt="User Profile"
                    />
                  </Button>
                  {profileMenuOpen && (
                    <div className="absolute -right-3 mt-2 w-44 sm:w-48 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl z-50 animate-in fade-in-80">
                      <div className="p-3 sm:p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                        <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">{user?.name}</p>
                        <p className="text-xs text-slate-500 truncate mt-1">{user?.email}</p>
                      </div>
                      <div className="p-2 space-y-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-3 py-2 text-xs sm:text-sm text-slate-600 hover:bg-slate-50 hover:text-[#2563EB] rounded-lg transition-all duration-200 cursor-pointer group/menu"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2 group-hover/menu:scale-110 transition-transform" />
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-3 py-2 text-xs sm:text-sm text-slate-600 hover:bg-slate-50 hover:text-[#2563EB] rounded-lg transition-all duration-200 cursor-pointer group/menu"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-2 group-hover/menu:scale-110 transition-transform" />
                          Settings
                        </Link>
                        <button className="flex items-center w-full px-3 py-2 text-xs sm:text-sm text-slate-600 hover:bg-slate-50 hover:text-[#2563EB] rounded-lg transition-all duration-200 cursor-pointer group/menu">
                          <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-2 group-hover/menu:scale-110 transition-transform" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-2 sm:space-x-3">
                <Link
                  to="/auth/login"
                  className="px-4 sm:px-6 py-1.5 md:py-2.5 rounded-xl bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-sm font-medium text-white hover:from-[#1E3A8A] hover:to-[#1D4ED8] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer whitespace-nowrap border border-blue-500/30"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="hidden sm:block px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-300 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <button
              className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-[#2563EB]/30 hover:bg-white transition-all duration-300 cursor-pointer group ml-1 sm:ml-2 shadow-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600 group-hover:text-[#2563EB] group-hover:scale-110 transition-transform" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600 group-hover:text-[#2563EB] group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 animate-in slide-in-from-top">
          <div className="px-3 sm:px-4 pt-2 sm:pt-3 pb-3 sm:pb-4 space-y-2">
            <div className="relative mb-3 sm:mb-4 md:hidden">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={context?.search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-slate-800"
              />
            </div>

            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-300 relative group rounded-xl ${
                  isActive(item.link) ? "text-[#2563EB] bg-blue-50" : "text-slate-600 hover:text-[#2563EB] hover:bg-slate-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
                <span
                  className={`absolute bottom-2 left-3 sm:left-4 right-3 sm:right-4 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] transition-all duration-300 ${
                    isActive(item.link) ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                ></span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

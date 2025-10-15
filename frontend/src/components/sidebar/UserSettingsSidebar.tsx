import { useState, type ReactNode } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscAccount } from "react-icons/vsc";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { name: "Profile Settings", icon: CiUser, route: "." },
  { name: "Account Settings", icon: VscAccount, route: "account" },
];

const SettingsSidebar = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen ">
      <div
        className={`sticky top-0 left-0 shrink-0 ${
          sidebarOpen ? "lg:w-72 w-20" : "w-20"
        } flex flex-col bg-white/80 backdrop-blur-xl border-r border-[#E2E8F0] shadow-cardHover overflow-y-auto`}
      >
        {sidebarOpen ? (
          <div className="flex flex-col h-full p-2 md:p-4 lg:p-6 z-10">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] bg-clip-text text-transparent hidden lg:block">
                Settings
              </h1>
              <RxHamburgerMenu
                className="h-6 w-6 text-[#64748B] hover:text-[#2563EB] hover:bg-[#F1F5F9] cursor-pointer rounded-xl p-1 transition-all duration-300 hover:scale-110"
                onClick={handleMenuClick}
              />
            </div>
            <div className="flex flex-col flex-1 space-y-3">
              {sidebarItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-4 hover:bg-gradient-to-r hover:from-[#2563EB]/5 hover:to-[#0EA5E9]/5 p-4 rounded-2xl hover:text-[#2563EB] cursor-pointer transition-all duration-300 group border border-transparent hover:border-[#2563EB]/30 shadow-sm hover:shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.route);
                  }}
                >
                  <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-[#2563EB]/10 transition-colors duration-300">
                    <item.icon className="h-5 w-5 text-[#64748B] group-hover:text-[#2563EB] transition-colors duration-300" />
                  </div>
                  <span className="font-semibold text-base text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-300 hidden lg:inline">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-6 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-[#2563EB]/5 to-[#0EA5E9]/5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">U</span>
                </div>
                <div className="hidden lg:block">
                  <p className="font-medium text-[#0F172A] text-sm">User Account</p>
                  <p className="text-[#64748B] text-xs">Settings</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center h-full p-4">
            <RxHamburgerMenu
              className="h-7 w-7 text-[#64748B] hover:text-[#2563EB] hover:bg-[#F1F5F9] cursor-pointer rounded-xl p-1 transition-all duration-300 hover:scale-110 mb-8"
              onClick={handleMenuClick}
            />
            <div className="flex flex-col space-y-4">
              {sidebarItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-center p-3 rounded-2xl hover:bg-gradient-to-r hover:from-[#2563EB]/5 hover:to-[#0EA5E9]/5 cursor-pointer transition-all duration-300 group border border-transparent hover:border-[#2563EB]/30 shadow-sm hover:shadow-md"
                >
                  <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-[#2563EB]/10 transition-colors duration-300">
                    <item.icon className="h-5 w-5 text-[#64748B] group-hover:text-[#2563EB] transition-colors duration-300" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] flex items-center justify-center">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100">{children}</main>
    </div>
  );
};

export default SettingsSidebar;

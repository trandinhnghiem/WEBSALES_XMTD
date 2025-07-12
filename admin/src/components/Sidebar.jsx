import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Users,
  FileText,
  Truck,
  Package,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const [openCreate, setOpenCreate] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isAccountPath =
    location.pathname === "/create-customer" ||
    location.pathname === "/create-employee";

  return (
    <div
  className={`bg-[#284ed4] text-white h-screen transition-all duration-300 ${
    collapsed ? "w-20" : "w-72"
  } pt-2.5 pb-4 px-4 pr-6 relative space-y-3 rounded-r-2xl shadow-lg`}
>

      {/* Nút thu gọn/mở rộng */}
      <button
        className="absolute top-1/2 -translate-y-1/2 -right-3.5 z-50 bg-white text-blue-800 border border-blue-700 hover:bg-blue-100 p-1 rounded-full shadow-md transition-all"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Mở rộng" : "Thu gọn"}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Logo & Tiêu đề */}
      <div className="mb-8">
        {collapsed ? (
          <div className="flex justify-center">
            <img
              src="/logo_XMTD.png"
              alt="Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 px-3 py-3 bg-blue-600 rounded-lg shadow-md mx-auto">
            <img
              src="/logo_XMTD.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-lg font-semibold whitespace-nowrap tracking-wide">
              XI MĂNG TÂY ĐÔ
            </h1>
          </div>
        )}
      </div>

        
      {/* QUẢN LÝ TÀI KHOẢN dropdown */}
      <div className="mt-6">
      <button
        onClick={() => setOpenCreate(!openCreate)}
        className={`mt-5 flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
          isAccountPath ? "bg-blue-800 font-semibold" : "hover:bg-blue-800"
        }`}
      >
        <span className="flex items-center gap-2">
          <Users size={18} />
          {!collapsed && <span>QUẢN LÝ TÀI KHOẢN</span>}
        </span>
        {!collapsed &&
          (openCreate ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
      </button>

      {!collapsed && openCreate && (
        <div className="mt-1 mb-1 ml-6 space-y-1">
          <NavLink
            to="/create-customer"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-base transition-colors ${
                isActive
                  ? "bg-blue-800 font-semibold text-white"
                  : "hover:bg-blue-800 hover:text-gray-100"
              }`
            }
          >
            Tài khoản khách hàng
          </NavLink>
          <NavLink
            to="/create-employee"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-base transition-colors ${
                isActive
                  ? "bg-blue-800 font-semibold text-white"
                  : "hover:bg-blue-800 hover:text-gray-100"
              }`
            }
          >
            Tài khoản nhân viên
          </NavLink>
        </div>
      )}

      {/* Các mục còn lại */}
      <NavLink
        to="/credit-info"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            isActive
              ? "bg-blue-800 font-semibold text-white"
              : "hover:bg-blue-800 hover:text-gray-100"
          }`
        }
      >
        <FileText size={18} />
        {!collapsed && <span>THÔNG TIN HẠN MỨC</span>}
      </NavLink>

      <NavLink
        to="/delivery-codes"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            isActive
              ? "bg-blue-800 font-semibold text-white"
              : "hover:bg-blue-800 hover:text-gray-100"
          }`
        }
      >
        <Package size={18} />
        {!collapsed && <span>MÃ SỐ GIAO HÀNG</span>}
      </NavLink>

      <NavLink
        to="/delivery-details"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            isActive
              ? "bg-blue-800 font-semibold text-white"
              : "hover:bg-blue-800 hover:text-gray-100"
          }`
        }
      >
        <Truck size={18} />
        {!collapsed && <span>CHI TIẾT XUẤT HÀNG</span>}
      </NavLink>
    </div>
    </div>
  );
}

export default Sidebar;
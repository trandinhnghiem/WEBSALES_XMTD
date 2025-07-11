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
  Package
} from "lucide-react"; // Bạn có thể chọn icon khác tùy nhu cầu

function Sidebar() {
  const location = useLocation();
  const [openCreate, setOpenCreate] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Trạng thái thu gọn

  const isAccountPath =
    location.pathname === "/create-customer" ||
    location.pathname === "/create-employee";

  return (
    <div
      className={`bg-blue-700 text-white ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 p-4 space-y-4 relative`}
    >
      {/* Nút thu gọn/mở rộng */}
      <button
        className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-800 p-1 rounded"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Mở rộng" : "Thu gọn"}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Logo / Tên */}
      {/* Header với logo và tiêu đề */}
<div className="mb-4">
  <div className="flex items-center justify-center mb-2">
    <img
      src="/logo_XMTD.png" // Đặt logo vào public/logo.png
      alt="Logo"
      className={`transition-all duration-300 ${collapsed ? "w-8" : "w-20"}`}
    />
  </div>
  {!collapsed && (
    <>
      <h1 className="text-center text-lg font-semibold">XI MĂNG TÂY ĐÔ</h1>
      <hr className="border-t border-blue-300 mt-2" />
    </>
  )}
</div>


      {/* QUẢN LÝ TÀI KHOẢN */}
      <button
        onClick={() => setOpenCreate(!openCreate)}
        className={`flex items-center justify-between w-full px-2 py-2 rounded ${
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

      {/* Menu con */}
      {!collapsed && openCreate && (
        <div className="ml-5">
          <NavLink
            to="/create-customer"
            className={({ isActive }) =>
              `block w-full px-2 py-2 rounded text-sm ${
                isActive ? "bg-blue-800 font-semibold text-white" : "hover:bg-blue-800"
              }`
            }
          >
            Tài khoản khách hàng
          </NavLink>
          <NavLink
            to="/create-employee"
            className={({ isActive }) =>
              `block w-full px-2 py-2 rounded text-sm ${
                isActive ? "bg-blue-800 font-semibold text-white" : "hover:bg-blue-800"
              }`
            }
          >
            Tài khoản nhân viên
          </NavLink>
        </div>
      )}

      {/* Các menu khác */}
      <NavLink
        to="/credit-info"
        className={({ isActive }) =>
          `flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-blue-800 ${
            isActive ? "bg-blue-800 font-semibold" : ""
          }`
        }
      >
        <FileText size={18} />
        {!collapsed && "THÔNG TIN HẠN MỨC"}
      </NavLink>

      <NavLink
        to="/delivery-codes"
        className={({ isActive }) =>
          `flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-blue-800 ${
            isActive ? "bg-blue-800 font-semibold" : ""
          }`
        }
      >
        <Package size={18} />
        {!collapsed && "MÃ SỐ GIAO HÀNG"}
      </NavLink>

      <NavLink
        to="/delivery-details"
        className={({ isActive }) =>
          `flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-blue-800 ${
            isActive ? "bg-blue-800 font-semibold" : ""
          }`
        }
      >
        <Truck size={18} />
        {!collapsed && "CHI TIẾT XUẤT HÀNG"}
      </NavLink>
    </div>
  );
}

export default Sidebar;

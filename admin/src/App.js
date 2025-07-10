import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import CreateCustomer from "./pages/CreateCustomer";
import CreateEmployee from "./pages/CreateEmployee";
import CreditLimitInfo from "./pages/CreditLimitInfo";
import DeliveryCodes from "./pages/DeliveryCodes";
import DeliveryDetails from "./pages/DeliveryDetails";

function App() {
  const [sidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex min-h-screen bg-white">
        {/* Sidebar */}
        <div className={`bg-blue-700 text-white w-64 p-4 space-y-4 ${sidebarOpen ? "block" : "hidden"}`}>
          <h1 className="text-2xl font-bold mb-4">XMTĐ Admin</h1>
          <NavLink to="/create-customer" className="block hover:underline">Tạo khách hàng</NavLink>
          <NavLink to="/create-employee" className="block hover:underline">Tạo nhân viên</NavLink>
          <NavLink to="/credit-info" className="block hover:underline">Thông tin hạn mức</NavLink>
          <NavLink to="/delivery-codes" className="block hover:underline">Mã số giao hàng</NavLink>
          <NavLink to="/delivery-details" className="block hover:underline">Chi tiết xuất hàng</NavLink>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50">
          <Routes>
            <Route path="/create-customer" element={<CreateCustomer />} />
            <Route path="/create-employee" element={<CreateEmployee />} />
            <Route path="/credit-info" element={<CreditLimitInfo />} />
            <Route path="/delivery-codes" element={<DeliveryCodes />} />
            <Route path="/delivery-details" element={<DeliveryDetails />} />
            <Route path="*" element={<div className="text-xl text-gray-600\">Chọn mục bên trái để bắt đầu</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

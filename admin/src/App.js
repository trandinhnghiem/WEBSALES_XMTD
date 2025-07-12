import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CreateCustomer from "./pages/CreateCustomer";
import CreateEmployee from "./pages/CreateEmployee";
import CreditLimitInfo from "./pages/CreditLimitInfo";
import DeliveryCodes from "./pages/DeliveryCodes";
import DeliveryDetails from "./pages/DeliveryDetails";
import Header from "./components/Header";
import Login from "./pages/Login"; // 👈 thêm file login

function LayoutWrapper() {
  const location = useLocation();

  // Kiểm tra có user đăng nhập không
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user && user.role === "admin";

  // Nếu là trang /login → không cần layout
  if (location.pathname === "/login") {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // Nếu chưa login → redirect về login
  if (!isLoggedIn) return <Navigate to="/login" />;

  const titleMap = {
    "/create-customer": "Quản lý tài khoản",
    "/create-employee": "Quản lý nhân viên",
    "/credit-info": "Thông tin hạn mức",
    "/delivery-codes": "Mã số giao hàng",
    "/delivery-details": "Chi tiết xuất hàng",
  };

  const pageTitle = titleMap[location.pathname] || "Trang chính";

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={pageTitle} />
        <div className="flex-1 p-6 bg-gray-50">
          <Routes>
            <Route path="/create-customer" element={<CreateCustomer />} />
            <Route path="/create-employee" element={<CreateEmployee />} />
            <Route path="/credit-info" element={<CreditLimitInfo />} />
            <Route path="/delivery-codes" element={<DeliveryCodes />} />
            <Route path="/delivery-details" element={<DeliveryDetails />} />
            <Route path="*" element={<div className="text-xl text-gray-600">Chọn mục bên trái để bắt đầu</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;

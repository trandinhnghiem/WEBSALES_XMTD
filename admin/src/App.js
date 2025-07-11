import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar"; // <-- thêm dòng này
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
        {sidebarOpen && <Sidebar />} {/* tách ra thành component riêng */}

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto h-screen">
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
    </Router>
  );
}

export default App;

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header"; // Import component Header

const provincesList = [
  "Hà Nội", "Hồ Chí Minh", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "Bà Rịa - Vũng Tàu",
  "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định",
  "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk",
  "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang",
  "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên",
  "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu"
];

export default function CreateCustomer() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    password: "",
    tax_code: "",
    address: "",
    credit_limit: "",
    provinces: [],
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const dropdownRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    fetchAccounts();
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const fetchAccounts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/distributors");
      const data = await res.json();
      if (res.ok) setAccounts(data);
    } catch (err) {
      console.error("Không thể lấy danh sách:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleProvince = (province) => {
    setForm((prev) => {
      const exists = prev.provinces.includes(province);
      return {
        ...prev,
        provinces: exists
          ? prev.provinces.filter((p) => p !== province)
          : [...prev.provinces, province],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/distributors/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Tạo thành công!");
        setForm({ id: "", name: "", password: "", tax_code: "", address: "", credit_limit: "", provinces: [] });
        fetchAccounts();
        setShowForm(false);
      } else {
        alert(data.message || "Có lỗi xảy ra.");
      }
    } catch (error) {
      alert("Không thể kết nối server.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    // if (!confirm("Bạn có chắc muốn xóa tài khoản này?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/distributors/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Đã xóa thành công!");
        fetchAccounts();
      } else {
        alert("Xóa thất bại!");
      }
    } catch (err) {
      alert("Không thể kết nối server.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 w-full">
      <Header title="Quản lý tài khoản" />
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Tài khoản khách hàng</h2>

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-6"
          onClick={() => setShowForm(!showForm)}
        >
          + Thêm tài khoản
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-8 border p-4 rounded shadow bg-white">
            <div>
              <label className="block text-sm font-medium">ID</label>
              <input type="text" name="id" value={form.id} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="Nhập mã khách hàng"/>
            </div>

            <div>
              <label className="block text-sm font-medium">Tên</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="Nhập tên khách hàng"/>
            </div>

            <div>
              <label className="block text-sm font-medium">Mật khẩu</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="Nhập mã số thuế kinh doanh"/>
            </div>

            <div>
              <label className="block text-sm font-medium">Mã số thuế</label>
              <input type="text" name="tax_code" value={form.tax_code} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Nhập mã số thuế kinh doanh"/>
            </div>

            <div>
              <label className="block text-sm font-medium">Địa chỉ</label>
              <input type="text" name="address" value={form.address} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Nhập địa chỉ (VD: Cần Thơ)"/>
            </div>
            <div>
              <label className="block text-sm font-medium">Hạn mức tín dụng (VNĐ)</label>
              <input type="number" name="credit_limit" value={form.credit_limit || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" min="0" placeholder="Nhập số tiền (VD: 50000000)"/>
            </div>

            <div className="relative" ref={dropdownRef}>
              <label className="block text-sm font-medium mb-1">Vùng phân phối (chọn nhiều)</label>
              <div
                className="w-full border rounded px-3 py-2 cursor-pointer bg-white flex justify-between items-center"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="truncate">
                  {form.provinces.length > 0 ? form.provinces.join(", ") : "Chọn vùng phân phối"}
                </span>
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {showDropdown && (
                <div className="absolute z-50 bg-white border mt-1 max-h-60 overflow-y-auto w-full rounded shadow">
                  {provincesList.map((province, idx) => (
                    <label key={idx} className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-2 accent-blue-600"
                        checked={form.provinces.includes(province)}
                        onChange={() => toggleProvince(province)}
                      />
                      {province}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Tạo khách hàng
            </button>
          </form>
        )}

        {/* Danh sách tài khoản */}
        <div className="overflow-x-auto border rounded shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-center">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Tên</th>
                <th className="px-4 py-2">Mã số thuế</th>
                <th className="px-4 py-2">Địa chỉ</th>
                <th className="px-4 py-2">Hạn mức tín dụng</th>
                <th className="px-4 py-2">Vùng phân phối</th>
                <th className="px-4 py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{acc.id}</td>
                  <td className="px-4 py-2">{acc.name}</td>
                  <td className="px-4 py-2">{acc.tax_code}</td>
                  <td className="px-4 py-2">{acc.address}</td>
                  <td className="px-4 py-2">{acc.credit_limit?.toLocaleString("vi-VN")}</td>
                  <td className="px-4 py-2">
                    {Array.isArray(acc.provinces)
                      ? acc.provinces.join(", ")
                      : acc.provinces}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm">
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => handleDelete(acc.id)}
                      className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                    >
                      Xóa
                    </button>
                    
                  </td>
                </tr>
              ))}
              {accounts.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-4 text-gray-500 italic">
                    Chưa có tài khoản nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

const provincesList = [
  "Hà Nội", "Thành phố Hồ Chí Minh", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "Huế",
  "Lai Châu", "Điện Biên", "Sơn La", "Cao Bằng", "Lạng Sơn", "Quảng Ninh",
  "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Tuyên Quang", "Lào Cai", "Thái Nguyên",
  "Phú Thọ", "Bắc Ninh", "Hưng Yên", "Ninh Bình", "Quảng Trị", "Quảng Ngãi",
  "Gia Lai", "Khánh Hòa", "Lâm Đồng", "Đắk Lắk", "Đồng Nai", "Tây Ninh",
  "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang",
];

export default function CreateCustomer() {
  /* ---------- STATE ---------- */
  const [form, setForm] = useState({
    id: "",
    name: "",
    password: "",
    tax_code: "",
    address: "",
    credit_limit: "",
    provinces: [],
  });
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const dropdownRef = useRef();

  /* ---------- EFFECT ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    fetchAccounts();
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- API ---------- */
  const fetchAccounts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/distributors?role=customer");
      const data = await res.json();
      if (res.ok) setAccounts(data);
    } catch (err) {
      console.error("Không thể lấy danh sách:", err);
    }
  };

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleProvince = (province) =>
    setForm((prev) => ({
      ...prev,
      provinces: prev.provinces.includes(province)
        ? prev.provinces.filter((p) => p !== province)
        : [...prev.provinces, province],
    }));

  /** mở form chỉnh sửa */
  const openEdit = (acc) => {
    setForm({
      id: acc.id,
      name: acc.name,
      password: "", // không hiển thị hash
      tax_code: acc.tax_code,
      address: acc.address,
      credit_limit: acc.credit_limit,
      provinces: acc.provinces || [],
    });
    setEditingId(acc.id);
    setShowForm(true);
  };

  /** tạo mới hoặc cập nhật */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:5000/api/accounts/${editingId}`
      : "http://localhost:5000/api/accounts/create";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert(editingId ? "Đã cập nhật!" : "Tạo thành công!");
        resetForm();
        fetchAccounts();
      } else alert(data.message || "Lỗi!");
    } catch {
      alert("Không thể kết nối server.");
    }
  };

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      password: "",
      tax_code: "",
      address: "",
      credit_limit: "",
      provinces: [],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xoá khách hàng này?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/distributors/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Đã xóa thành công!");
        fetchAccounts();
      } else alert("Xóa thất bại!");
    } catch (err) {
      alert("Không thể kết nối server.");
      console.error(err);
    }
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="p-2 w-full">
      <h1 className="text-2xl font-semibold text-center uppercase mb-6">
        Tài khoản khách hàng
      </h1>

      <button
        onClick={() => {
          resetForm();
          setShowForm(!showForm);
        }}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-6"
      >
        + Thêm khách hàng
      </button>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-8 border p-4 rounded shadow bg-white"
        >
          {/* id */}
          <div>
            <label className="block text-sm font-medium">ID</label>
            <input
              name="id"
              value={form.id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              placeholder="Nhập mã khách hàng"
            />
          </div>

          {/* name */}
          <div>
            <label className="block text-sm font-medium">Tên</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              placeholder="Nhập tên khách hàng"
            />
          </div>

          {/* password */}
          <div>
            <label className="block text-sm font-medium">Mật khẩu</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required={!editingId} // khi sửa có thể để trống = không đổi
              placeholder={
                editingId ? "Để trống nếu không đổi" : "Nhập mật khẩu mạnh"
              }
            />
          </div>

          {/* tax_code & address */}
          <div>
            <label className="block text-sm font-medium">Mã số thuế</label>
            <input
              name="tax_code"
              value={form.tax_code}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="MST kinh doanh"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Địa chỉ</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Địa chỉ (VD: Cần Thơ)"
            />
          </div>

          {/* credit_limit */}
          <div>
            <label className="block text-sm font-medium">
              Hạn mức tín dụng (VNĐ)
            </label>
            <input
              name="credit_limit"
              type="number"
              min="0"
              value={form.credit_limit || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="VD: 50000000"
            />
          </div>

          {/* provinces */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium mb-1">
              Vùng phân phối (chọn nhiều)
            </label>
            <div
              className="w-full border rounded px-3 py-2 cursor-pointer bg-white flex justify-between items-center"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="truncate">
                {form.provinces.length
                  ? form.provinces.join(", ")
                  : "Chọn vùng phân phối"}
              </span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
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
                {provincesList.map((p) => (
                  <label
                    key={p}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="mr-2 accent-blue-600"
                      checked={form.provinces.includes(p)}
                      onChange={() => toggleProvince(p)}
                    />
                    {p}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* submit */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            {editingId ? "Lưu thay đổi" : "Tạo khách hàng"}
          </button>
        </form>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto border rounded shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-center">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2">Mã số thuế</th>
              <th className="px-4 py-2">Địa chỉ</th>
              <th className="px-4 py-2">Hạn mức</th>
              <th className="px-4 py-2">Vùng phân phối</th>
              <th className="px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.id} className="border-t">
                <td className="px-4 py-2">{acc.id}</td>
                <td className="px-4 py-2">{acc.name}</td>
                <td className="px-4 py-2">{acc.tax_code}</td>
                <td className="px-4 py-2">{acc.address}</td>
                <td className="px-4 py-2">
                  {acc.credit_limit?.toLocaleString("vi-VN")}
                </td>
                <td className="px-4 py-2">
                  {Array.isArray(acc.provinces)
                    ? acc.provinces.join(", ")
                    : acc.provinces}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => openEdit(acc)}
                    className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm"
                  >
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
                <td colSpan="7" className="py-4 text-gray-500 italic">
                  Chưa có tài khoản nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

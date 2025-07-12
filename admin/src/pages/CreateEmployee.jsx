import { useState, useEffect } from "react";

export default function CreateEmployee() {
  /* ---------- STATE ---------- */
  const [showForm, setShowForm]   = useState(false);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", password: "" });

  /* ---------- LẤY DANH SÁCH NHÂN VIÊN ---------- */
  const fetchEmployees = async () => {
    try {
      const res  = await fetch("http://localhost:5000/api/users?role=employee");
      const data = await res.json();
      if (res.ok) setEmployees(data);
    } catch (err) {
      console.error("Không lấy được danh sách:", err);
    }
  };
  useEffect(() => { fetchEmployees(); }, []);

  /* ---------- HANDLE INPUT ---------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ---------- TẠO NHÂN VIÊN ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/employee", {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({
          ...form,
          role: "employee"           // 👈 Gửi role rõ ràng
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Đã tạo nhân viên!");
        setForm({ id: "", name: "", email: "", password: "" });
        setShowForm(false);
        fetchEmployees();
      } else {
        alert(data.message || "Có lỗi xảy ra.");
      }
    } catch (err) {
      alert("Không thể kết nối server.");
      console.error(err);
    }
  };

  /* ---------- XOÁ ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Xoá nhân viên này?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Đã xoá!");
        fetchEmployees();
      } else alert("Xoá thất bại");
    } catch (err) {
      console.error(err);
      alert("Không thể kết nối server.");
    }
  };

  return (
    <div className="p-2 w-full">
      <h1 className="text-2xl font-semibold text-center uppercase mb-6">Tài khoản nhân viên</h1>
      {/* nút mở form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-6"
      >
        + Thêm nhân viên
      </button>

      {/* FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow mb-8">
          <div>
            <label className="block text-sm font-medium">Mã nhân viên (ID)</label>
            <input
              name="id"
              value={form.id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Họ tên</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mật khẩu</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Tạo nhân viên
          </button>
        </form>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full text-sm text-center divide-y divide-gray-200">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Họ tên</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="px-4 py-2">{emp.id}</td>
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-gray-500 italic">
                  Chưa có nhân viên nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

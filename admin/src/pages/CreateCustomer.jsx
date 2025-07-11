import { useState } from "react";

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
    taxCode: "",
    address: "",
    provinces: [],
  });

  const [showDropdown, setShowDropdown] = useState(false);

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
        setForm({
          id: "",
          name: "",
          password: "",
          taxCode: "",
          address: "",
          provinces: [],
        });
      } else {
        alert(data.message || "Có lỗi xảy ra.");
      }
    } catch (error) {
      alert("Không thể kết nối server.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Tạo khách hàng / Nhà phân phối</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">ID</label>
          <input type="text" name="id" value={form.id} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Tên</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Mật khẩu</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Mã số thuế</label>
          <input type="text" name="taxCode" value={form.taxCode} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Địa chỉ</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">Vùng phân phối (chọn nhiều)</label>
          <div
            className="w-full border rounded px-3 py-2 cursor-pointer bg-white"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {form.provinces.length > 0
              ? form.provinces.join(", ")
              : "Chọn vùng phân phối"}
          </div>
          {showDropdown && (
            <div className="absolute z-10 bg-white border mt-1 max-h-60 overflow-y-auto w-full rounded shadow">
              {provincesList.map((province, idx) => (
                <label key={idx} className="flex items-center px-3 py-1 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    className="mr-2"
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
    </div>
  );
}

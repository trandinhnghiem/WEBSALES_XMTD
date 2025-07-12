import { useEffect, useState } from "react";

export default function CreditInfo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCredit = async () => {
    setLoading(true);
    const res  = await fetch("http://localhost:5000/api/accounts/credit-info");
    const list = await res.json();
    setData(list);
    setLoading(false);
  };

  useEffect(() => { fetchCredit(); }, []);

  if (loading) return <div className="p-6">Đang tải...</div>;

  return (
    <div className="p-2 w-full">
      <h1 className="text-2xl font-semibold text-center uppercase mb-6">
        Thông tin hạn mức khách hàng
      </h1>

      <div className="overflow-x-auto border rounded shadow bg-white">
        <table className="min-w-full text-sm text-center divide-y divide-gray-200">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2">Hạn mức đã cấp</th>
              <th className="px-4 py-2">Đã sử dụng</th>
              <th className="px-4 py-2">Còn lại</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-2">{c.id}</td>
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">
                  {Number(c.credit_limit).toLocaleString("vi-VN")}
                </td>
                <td className="px-4 py-2">
                  {Number(c.credit_used).toLocaleString("vi-VN")}
                </td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    c.credit_left < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {Number(c.credit_left).toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-gray-500 italic">
                  Chưa có dữ liệu hạn mức
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

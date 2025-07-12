import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/accounts/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // lưu vào localStorage
        localStorage.setItem("user", JSON.stringify(data));
        if (data.role === "admin") {
          navigate("/create-customer");
        } else {
          alert("Bạn không có quyền truy cập.");
        }
      } else {
        alert(data.message || "Đăng nhập thất bại.");
      }
    } catch (err) {
      alert("Không thể kết nối đến server.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập Admin</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="border w-full px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@gmail.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Mật khẩu</label>
          <input
            type="password"
            className="border w-full px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

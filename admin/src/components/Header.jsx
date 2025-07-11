// src/components/Header.jsx
export default function Header({ title }) {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800 uppercase">
        {title || "Dashboard"}
      </h2>
      {/* Bạn có thể thêm nút Logout, Avatar, hoặc Breadcrumb ở đây */}
    </header>
  );
}

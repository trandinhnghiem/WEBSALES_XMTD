// src/components/Header.jsx
import { Menu, LogOut } from "lucide-react";

export default function Header({ title }) {
  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Tiêu đề trung tâm */}
      <h1 className="text-xl font-semibold text-gray-800 uppercase text-left flex-1 hidden md:block">
        {title || "Dashboard"}
      </h1>

      {/* User info bên phải */}
      <div className="flex items-center space-x-3">
        <img
          src="https://i.pravatar.cc/40?img=12"
          alt="User avatar"
          className="w-9 h-9 rounded-full border border-gray-300"
        />
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-800">Nguyễn Văn A</p>
          <p className="text-xs text-gray-500">Quản trị viên</p>
        </div>
        <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

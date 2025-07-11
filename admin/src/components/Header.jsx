export default function Header({ title }) {
  return (
    <header className="w-full bg-white shadow-md px-6 py-6 flex items-center justify-between z-10">
      <h1 className="text-xl font-semibold text-gray-800 uppercase">
        {title || "Dashboard"}
      </h1>

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
      </div>
    </header>
  );
}

import { Link, Outlet } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <div className="flex flex-1 justify-between text-white bg-[#1F2937] px-[0.25rem] py-[0.5rem] md:px-[4rem] items-center sm:px-[2rem]">
        <Link
          to="/"
          className="text-[23.9px] font-[700] m-0 text-white !no-underline"
        >
          GYM MANAGEMENT
        </Link>
        <div className="flex gap-8 text-center  items-center">
          <Link
            to="/"
            className="text-[18.6px] m-0 text-white !no-underline hover:!text-blue-300 hover:!font-[500] hover:-translate-y-1 transition-transform duration-300 hover:animate-pulse"
          >
            Trang chủ
          </Link>
          <Link
            to="/"
            className="text-[18.6px] m-0  text-white !no-underline hover:!text-blue-300 hover:!font-[500] hover:-translate-y-1 transition-transform duration-300 hover:animate-pulse"
          >
            Lịch tập
          </Link>
          <Link
            to="/auth/login"
            className="text-[18.6px] m-0  text-white !no-underline hover:!text-blue-300 hover:!font-[500] hover:-translate-y-1 transition-transform duration-300 hover:animate-pulse"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

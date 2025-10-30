import { NavLink } from "react-router-dom";
import ButtonSweetalertLogOut from "../forms/ButtonSweetalertLogOut";

export default function DrawerManageAdmin() {
  return (
    <div className="fixed top-0 left-0 h-dvh w-dwh flex flex-col bg-[#1F2937] text-white gap-2 px-3 py-2 w-[15rem] ">
      <div className="mb-[1rem] font-bold text-[20.5px]">Admin Dashboard</div>
      <div className="flex flex-col gap-2 text-[19px]">
        <NavLink
          to="/admin/manage-courses"
          className={({ isActive }) =>
            isActive
              ? "bg-[#4B5563] !rounded-[4px] !no-underline text-white !text-left pl-3 pr-1 py-1 !hover:px-5 duration-200 !hover:cursor-pointer"
              : "hover:bg-[#4B5563] !rounded-[4px] !no-underline text-white !text-left pl-3 pr-1 py-1 hover:px-4 !hover:px-5 duration-200 !hover:cursor-pointer"
          }
        >
          Quản lý lịch
        </NavLink>
        <NavLink
          to="/admin/statistical-courses"
          className={({ isActive }) =>
            isActive
              ? "bg-[#4B5563] !rounded-[4px] !no-underline text-white !text-left pl-3 pr-1 py-1 !hover:px-5 duration-200 !hover:cursor-pointer"
              : "hover:bg-[#4B5563] !rounded-[4px] !no-underline text-white !text-left pl-3 pr-1 py-1 hover:px-4 !hover:px-5 duration-200 !hover:cursor-pointer"
          }
        >
          Quản lý dịch vụ
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-[#4B5563] !rounded-[4px] !no-underline text-white !text-left pl-3 pr-1 py-1 !hover:px-5 duration-200 !hover:cursor-pointer"
              : "hover:bg-[#4B5563] !rounded-[4px] !no-underline text-white !text-left pl-3 pr-1 py-1 hover:px-4 !hover:px-5 duration-200 !hover:cursor-pointer"
          }
        >
          Trang chủ
        </NavLink>
        <ButtonSweetalertLogOut />
      </div>
    </div>
  );
}

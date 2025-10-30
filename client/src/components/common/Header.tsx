import { Link, Outlet, useNavigate } from "react-router-dom";
import type { User } from "../../types/userType";
import { Button, Popover } from "antd";
import { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success me-2",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export default function Header() {
  const user: User = JSON.parse(sessionStorage.getItem("user") || "null");
  const navigate = useNavigate();
  //Popober
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  //Log out
  const handleLogOut = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Bạn có chắc muốn đăng xuất?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Đã đăng xuất thành công!",
            text: "Vui lòng đợi",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          sessionStorage.removeItem("user");
          setTimeout(() => navigate("/auth/login"), 1600);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Huỷ đăng xuất!",
            text: "Đã huỷ đăng xuất tài khoản.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

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
            className="text-[18.6px] m-0 text-white !no-underline hover:!text-blue-300 hover:!font-[500] hover:-translate-y-0.5 transition-transform duration-300 hover:animate-pulse"
          >
            Trang chủ
          </Link>
          {user?.rule === "admin" ? (
            <Link
              to="/admin/manage-courses"
              className="text-[18.6px] m-0  text-white !no-underline hover:!text-blue-300 hover:!font-[500] hover:-translate-y-0.5 transition-transform duration-300 hover:animate-pulse"
            >
              Quản lý lịch
            </Link>
          ) : (
            <Link
              to="/booking"
              className="text-[18.6px] m-0  text-white !no-underline hover:!text-blue-300 hover:!font-[500] hover:-translate-y-0.5 transition-transform duration-300 hover:animate-pulse"
            >
              Lịch đã đặt
            </Link>
          )}
          {user ? (
            <Popover
              content={
                <Button
                  onClick={() => {
                    hide();
                    handleLogOut();
                  }}
                >
                  Log out
                  <LogoutOutlined />
                </Button>
              }
              open={open}
              trigger="click"
              onOpenChange={handleOpenChange}
              className="text-[18.6px] m-0  text-white !no-underline hover:!text-blue-300 hover:!font-[500] hover:-translate-y-0.5 transition-transform duration-300 hover:animate-pulse hover:cursor-pointer"
            >
              {user.name}
            </Popover>
          ) : (
            <Link
              to="/auth/login"
              className="text-[18.6px] m-0  text-white !no-underline hover:!text-blue-300 hover:!font-[500] hover:-translate-y-0.5 transition-transform duration-300 hover:animate-pulse"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

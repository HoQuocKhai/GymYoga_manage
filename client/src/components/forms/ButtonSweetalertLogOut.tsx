import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success me-2",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export default function ButtonSweetalertLogOut() {
  const navigate = useNavigate();

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
    <button
      onClick={handleLogOut}
      className="hover:bg-[#4B5563] text-[#F87171] !rounded-[4px] !text-left pl-3 pr-1 py-1 hover:px-4 !hover:px-5 duration-200 !hover:cursor-pointer"
    >
      Đăng xuất
    </button>
  );
}

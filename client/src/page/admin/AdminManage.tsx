import { Outlet } from "react-router-dom";
import DrawerManageAdmin from "../../components/common/DrawerManageAdmin";
import Footer from "../../components/common/Footer";

export default function AdminManage() {
  return (
    <div className="flex flex-col">
      <div className="flex h-[80rem] bg-[#F9FAFB]">
        <DrawerManageAdmin />
        <Outlet />
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import DrawerManageAdmin from "../../components/common/DrawerManageAdmin";

export default function AdminManage() {
  return (
    <div className="flex flex-col bg-[#F9FAFB]">
      <div className="flex h-[42rem] bg-[#F9FAFB]">
        <DrawerManageAdmin />
        <Outlet />
      </div>
    </div>
  );
}

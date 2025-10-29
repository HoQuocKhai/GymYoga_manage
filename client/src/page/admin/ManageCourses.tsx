export default function ManageCourses() {
  return (
    <div className="flex h-full">
      <div className="flex flex-col h-dvh bg-[#1F2937] text-white gap-2 p-2 w-[15rem]">
        <div className="mb-[1rem] font-bold text-[20.5px]">Admin Dashboard</div>
        <div className="flex flex-col gap-2 text-[19px]">
          <div className="bg-[#4B5563] rounded-[4px] p-1.5 px-4.5 hover:px-5 duration-200 hover:cursor-pointer">
            Quản lý lịch
          </div>
          <div className="hover:bg-[#4B5563] hover:rounded-[4px] p-1.5 hover:px-3 duration-200 hover:cursor-pointer">
            Quản lý dịch vụ
          </div>
          <div className="hover:bg-[#4B5563] hover:rounded-[4px] p-1.5 hover:px-3 duration-200 hover:cursor-pointer">
            Trang chủ
          </div>
          <div className="text-[#F87171] hover:bg-[#4B5563] hover:rounded-[4px] p-1.5 hover:px-3 duration-200 hover:cursor-pointer">
            Đăng xuất
          </div>
        </div>
      </div>
      <div>
        <div>Thống kê lịch tập</div>
        <div className="flex">
          <div className="flex flex-col">
            <div>Gym</div>
            <div>0</div>
          </div>
          <div className="flex flex-col">
            <div>Yoga</div>
            <div>0</div>
          </div>
          <div className="flex flex-col">
            <div>Zumba</div>
            <div>0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

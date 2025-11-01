import TableBooking from "../../components/common/TableBooking";
import Footer from "../../components/common/Footer";
import { useState } from "react";
import ModalNewCourses from "../../components/forms/ModalNewCourses";

export default function BookingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col px-[0.25rem] py-[0.5rem] md:px-[4rem] sm:px-[2rem]">
        <div className="flex flex-1 justify-between px-0 py-[24px] md:px-[4rem] items-center sm:px-[2rem]">
          <p className="text-[31px] font-[700]] font-bold m-0">
            Quản lý lịch tập
          </p>
          <button
            onClick={showModal}
            className="cursor-pointer transition-all !text-[1rem] bg-blue-500 text-white px-3.5 py-2 !rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          >
            Đặt lịch mới
          </button>
        </div>
        <TableBooking />
      </div>

      <ModalNewCourses
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />

      <Footer />
    </div>
  );
}

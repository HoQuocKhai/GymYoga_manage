import { Button } from "react-bootstrap";
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
          <Button onClick={showModal}>Đặt lịch mới</Button>
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

import { Button } from "react-bootstrap";
import TableBooking from "../components/common/TableBooking";
import Footer from "../components/common/Footer";
import { useState } from "react";
import { Modal, Select } from "antd";

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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
      <Modal
        okText={"Lưu"}
        onOk={handleOk}
        cancelText={"Huỷ"}
        open={isModalOpen}
        title="Đặt lịch mới"
        onCancel={handleCancel}
        closable={{ "aria-label": "Custom Close Button" }}
        footer={
          <div className="flex flex-1 justify-end gap-1">
            <Button
              onClick={handleCancel}
              className="!bg-gray-500 text-white hover:!bg-gray-600 !border-gray-500"
            >
              Huỷ
            </Button>
            <Button
              onClick={handleOk}
              type="button"
              className="!bg-blue-500 !border-blue-500 hover:!bg-blue-600"
            >
              Lưu
            </Button>
          </div>
        }
      >
        <div className="flex flex-col">
          <label htmlFor="">Lớp học</label>
          <Select
            defaultValue=""
            placeholder="Chọn lớp học"
            onChange={handleChange}
            options={[
              { value: "", label: "Chọn lớp học", disabled: true },
              { value: "Gym", label: "Gym" },
              { value: "Yoga", label: "Yoga" },
              { value: "Zumba", label: "Zumba" },
            ]}
            className="flex flex-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Khung giờ</label>
          <Select
            defaultValue=""
            placeholder="Chọn khung giờ học"
            onChange={handleChange}
            options={[
              {
                value: "",
                label: "Chọn khung giờ học",
                disabled: true,
              },
              { value: "07:00 - 09:00", label: "07:00 - 09:00" },
              { value: "10:00 - 12:00", label: "10:00 - 12:00" },
              { value: "15:00 - 17:00", label: "15:00 - 1700" },
            ]}
            className="flex flex-1 !font-[700]"
          />
        </div>
      </Modal>
      <Footer />
    </div>
  );
}

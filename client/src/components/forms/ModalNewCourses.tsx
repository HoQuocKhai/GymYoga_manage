import { DatePicker, Form, Modal, Select, TimePicker } from "antd";
// import { Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../stores/store";
import { addBooking } from "../../apis/booking.api";
import type { Booking } from "../../types/userType";
import dayjs from "dayjs";

interface ModalNewCoursesProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export default function ModalNewCourses({
  open,
  onOk,
  onCancel,
}: ModalNewCoursesProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    courseId: "pickerClass",
    bookingDate: "",
    bookingTime: "pickerTime",
  });

  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // const configTypeDate = dayjs(formData.bookingDate, "YYYY-MM-DD");

  const handleSubmit = async () => {
    if (!user || !user.id) {
      alert("Không tìm thấy thông tin người dùng!");
      return;
    }

    const newBooking: Booking = {
      id: formData.courseId,
      userId: String(user.id),
      courseId: +formData.courseId,
      bookingDate: formData.bookingDate,
      bookingTime: formData.bookingTime,
    };

    try {
      await dispatch(addBooking(newBooking));
      onOk(); // đóng modal
      setFormData({
        courseId: "pickerClass",
        bookingDate: "",
        bookingTime: "pickerTime",
      });
    } catch (error) {
      console.error("Lỗi khi thêm lịch:", error);
    }
  };

  return (
    <Modal
      title="Đặt lịch tập mới"
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <div className="flex flex-col gap-3">
        <Form layout="vertical">
          <Form.Item
            label="Lớp học"
            name="courseId"
            rules={[{ required: true, message: "Vui lòng nhập lớp học" }]}
          >
            <Select
              placeholder="Chọn lớp"
              onChange={(value) => handleChange("courseId", value)}
              value={formData.courseId}
            >
              <Select.Option disabled={true} value="pickerClass">
                Chọn lớp
              </Select.Option>
              <Select.Option value="101">101</Select.Option>
              <Select.Option value="102">102</Select.Option>
              <Select.Option value="103">103</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Ngày tập"
            name="bookingDate"
            rules={[{ required: true, message: "Vui lòng chọn ngày tập" }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              className="w-full"
              onChange={(_, dateString) => {
                handleChange("bookingDate", dateString as string);
              }}
              // value={dayjs(formData.bookingDate, "YYYY-MM-DD")}
            />
          </Form.Item>

          <Form.Item
            label="Giờ tập"
            name="bookingTime"
            rules={[{ required: true, message: "Vui lòng chọn giờ tập" }]}
          >
            <Select
              placeholder="Chọn giờ"
              onChange={(value) => handleChange("bookingTime", value)}
              value={formData.bookingTime}
            >
              <Select.Option disabled={true} value="pickerTime">
                Chọn giờ
              </Select.Option>
              <Select.Option value="07:00">07:00</Select.Option>
              <Select.Option value="09:00">09:00</Select.Option>
              <Select.Option value="18:00">18:00</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

import { DatePicker, Modal, Select, TimePicker } from "antd";
// import { Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../stores/store"; // ⚠️ chỉnh path đúng với store của bạn
import { addBooking } from "../../apis/booking.api";
import type { Booking } from "../../types/userType";

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

  // ✅ kiểu dữ liệu rõ ràng
  const [formData, setFormData] = useState({
    coursesId: "",
    bookingDate: "",
    bookingTime: "",
  });

  // ✅ Lấy user từ sessionStorage an toàn
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ✅ Hàm thay đổi form
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Submit
  const handleSubmit = async () => {
    if (!user || !user.id) {
      alert("Không tìm thấy thông tin người dùng!");
      return;
    }

    const newBooking: Booking = {
      id: formData.coursesId,
      userId: String(user.id),
      courseId: +formData.coursesId,
      bookingDate: formData.bookingDate,
      bookingTime: formData.bookingTime,
    };

    try {
      await dispatch(addBooking(newBooking));
      onOk(); // đóng modal
      setFormData({ coursesId: "", bookingDate: "", bookingTime: "" });
    } catch (error) {
      console.error("Lỗi khi thêm lịch:", error);
    }

    setFormData({
      coursesId: "",
      bookingDate: "",
      bookingTime: "",
    });
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
        <label>
          Lớp học:
          <Select
            placeholder="Chọn lớp học"
            className="w-full"
            value={formData.coursesId}
            onChange={(value) => handleChange("coursesId", value)}
            options={[
              { value: "104", label: "Yoga cơ bản" },
              { value: "105", label: "Fitness nâng cao" },
              { value: "106", label: "Cardio buổi sáng" },
            ]}
          />
        </label>

        <label>
          Ngày tập:
          <DatePicker
            className="w-full"
            format="YYYY-MM-DD"
            onChange={(_, dateString) =>
              handleChange("bookingDate", dateString as string)
            }
          />
        </label>

        <label>
          Giờ tập:
          <TimePicker
            className="w-full"
            format="HH:mm"
            onChange={(_, timeString) =>
              handleChange("bookingTime", timeString as string)
            }
          />
        </label>
      </div>
    </Modal>
  );
}

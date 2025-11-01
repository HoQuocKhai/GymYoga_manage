import { DatePicker, Form, Modal, Select } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../stores/store";
import { addBooking, updateBooking } from "../../apis/booking.api";
import type { Booking } from "../../types/userType";
import Swal from "sweetalert2";
import { useValidateBooking } from "../../hooks/useValidateBooking";

interface ModalNewCoursesProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  editing?: Booking | null;
}

export default function ModalNewCourses({
  open,
  onOk,
  onCancel,
  editing = null,
}: ModalNewCoursesProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { isDuplicateBooking } = useValidateBooking();
  const [form] = Form.useForm();

  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (editing) {
      form.setFieldsValue(editing);
    } else {
      form.resetFields();
    }
  }, [editing, open, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!user || !user.id) {
        Swal.fire("Lỗi", "Không tìm thấy thông tin người dùng!", "error");
        return;
      }

      const bookingData: Booking = {
        // id: editing ? editing.id : crypto.randomUUID(),
        userId: String(user.id),
        courseId: +values.courseId,
        bookingDate: values.bookingDate.format("YYYY-MM-DD"),
        bookingTime: values.bookingTime,
      };

      if (isDuplicateBooking(bookingData)) {
        Swal.fire({
          icon: "error",
          title: "Lịch bị trùng!",
          text: "Bạn đã đặt lịch cho khóa học này vào cùng thời gian.",
        });
        return;
      }

      if (editing) {
        await dispatch(updateBooking(bookingData));
        Swal.fire("Thành công", "Cập nhật lịch thành công!", "success");
      } else {
        await dispatch(addBooking(bookingData));
        Swal.fire("Thành công", "Đặt lịch thành công!", "success");
      }

      form.resetFields();
      onOk();
    } catch (error) {
      console.error(error);
      Swal.fire("Lỗi", "Không thể xử lý yêu cầu. Vui lòng thử lại!", "error");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={editing ? "Chỉnh sửa lịch tập" : "Đặt lịch tập mới"}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={editing ? "Lưu thay đổi" : "Xác nhận"}
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Lớp học"
          name="courseId"
          rules={[{ required: true, message: "Vui lòng chọn lớp học" }]}
        >
          <Select placeholder="Chọn lớp">
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
          <DatePicker format="YYYY-MM-DD" className="w-full" />
        </Form.Item>

        <Form.Item
          label="Giờ tập"
          name="bookingTime"
          rules={[{ required: true, message: "Vui lòng chọn giờ tập" }]}
        >
          <Select placeholder="Chọn giờ">
            <Select.Option value="07:00">07:00</Select.Option>
            <Select.Option value="09:00">09:00</Select.Option>
            <Select.Option value="18:00">18:00</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

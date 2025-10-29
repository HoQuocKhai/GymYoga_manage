import { Modal, Form, DatePicker, Select } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import type { Booking } from "../../types/userType";

interface ModalEditBookingProps {
  open: boolean;
  onOk: (values: Partial<Booking>) => void;
  onCancel: () => void;
  bookingData?: Booking | null; // dữ liệu của dòng cần sửa
}

export default function ModalEditBooking({
  open,
  onOk,
  onCancel,
  bookingData,
}: ModalEditBookingProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (bookingData) {
      form.setFieldsValue({
        ...bookingData,
        bookingDate: bookingData.bookingDate
          ? dayjs(bookingData.bookingDate)
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [bookingData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues: Partial<Booking> = {
        ...values,
        bookingDate: values.bookingDate
          ? values.bookingDate.format("YYYY-MM-DD")
          : "",
      };
      // note: do not remove id here — let caller attach id
      onOk(formattedValues);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Chỉnh sửa lịch tập"
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText="Lưu thay đổi"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        {/* <Form.Item
          label="Lớp học (coursesId)"
          name="coursesId"
          rules={[{ required: true, message: "Vui lòng nhập lớp học" }]}
        >
          <Input placeholder="VD: 101" />
        </Form.Item> */}

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

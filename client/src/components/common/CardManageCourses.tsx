import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { DatePicker, Form, Input, Select, Table } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import "../../assets/tableBooking.css";
import type { Booking } from "../../types/userType";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../stores/store";
import {
  deleteBooking,
  getBooking,
  updateBooking,
} from "../../apis/booking.api";
import Swal from "sweetalert2";
import ModalEditBooking from "../../components/forms/ModalEditBooking";
import { getUserlist } from "../../apis/user.api";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export default function CardManageCourses() {
  const data = {
    labels: ["Gym", "Yoga", "Zumba"],
    datasets: [
      {
        label: "Số lịch đã đặt",
        data: [30, 50, 20],
        backgroundColor: ["#98a6f5", "#aed9c1", "#bab6f5"],
        borderColor: ["#6461c2", "#68bf63", "#6461c2"],
        borderWidth: 1,
      },
    ],
  };

  const { booking } = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch<AppDispatch>();

  const { users } = useSelector((state: RootState) => state.users);

  const [bookingList, setBookingList] = useState<Booking[]>();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    dispatch(getUserlist());
    dispatch(getBooking());
    setBookingList(booking);
  }, [bookingList]);

  const bookingData = booking?.map((item) => {
    const user = users.find((u) => String(u.id) === String(item.userId));
    return {
      ...item,
      name: user?.name || "Không có tên",
      email: user?.email || "Không có email",
      key: item.id,
    };
  });

  const handleConfirmDelete = (record: Booking) => {
    swalWithBootstrapButtons
      .fire({
        title: `Bạn có chắc muốn Xoá lịch tập?`,
        text: `Lớp: ${record.id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Đã Xoá thành công lịch tập!",
            text: `Lớp: ${record.id}`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(deleteBooking(record));
          setBookingList(
            (prev) =>
              (prev = prev?.filter(
                (booking: Booking) => booking.courseId != record.courseId
              ))
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Đã Huỷ xoá lịch tập!",
            text: `Lớp: ${record.id}`,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleEdit = (record: Booking) => {
    setSelectedBooking(record);
    setIsEditOpen(true);
  };

  const handleEditOk = async (values: Partial<Booking>) => {
    if (!selectedBooking) return;

    const payload: Booking = {
      ...selectedBooking,
      ...values,
      bookingDate: values.bookingDate ?? selectedBooking.bookingDate,
      bookingTime: values.bookingTime ?? selectedBooking.bookingTime,
      courseId: values.courseId ?? selectedBooking.courseId,
    } as Booking;

    try {
      await dispatch(updateBooking(payload)).unwrap();
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsEditOpen(false);
      setSelectedBooking(null);
    }
  };

  const handleEditCancel = () => {
    setIsEditOpen(false);
    setSelectedBooking(null);
  };

  const columns: TableProps<Booking>["columns"] = [
    {
      title: "Lớp",
      dataIndex: "courseId",
    },
    {
      title: "Ngày tập",
      dataIndex: "bookingDate",
    },
    {
      title: "Khung giờ",
      dataIndex: "bookingTime",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (_, record: Booking) => (
        <div className="flex gap-1">
          <button
            className="px-3 py-2 text-blue-500 duration-200 hover:-translate-y-0.5 hover:!px-4 hover:!rounded-[8px] hover:shadow-md hover:bg-blue-500 hover:text-white !rounded-[1rem]"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </button>
          <button
            className="px-3 py-2 text-red-500 duration-200 hover:-translate-y-0.5 hover:!px-4 hover:!rounded-[8px] hover:shadow-md hover:bg-red-500 hover:text-white !rounded-[1rem]"
            onClick={() => handleConfirmDelete(record)}
          >
            Xoá
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col flex-1 justify-start pl-[16rem] pb-[60rem] pr-[1rem] h-[75rem] bg-[#F9FAFB]">
      <div className="mb-6 font-bold font-[inter] text-[29px]">
        Thống kê lịch tập
      </div>

      <div className="flex gap-4 mb-6 flex-1 justify-around">
        <div className="flex flex-col justify-center w-[22rem] h-[5rem] bg-white shadow-md pr-[3rem] pl-[1rem] py-[0.5rem] text-left rounded-[8px]">
          <div className="font-[600]">Tổng số lịch Gym</div>
          <div className="font-bold text-[#2563EB]">0</div>
        </div>
        <div className="flex flex-col w-[22rem] justify-center h-[5rem] bg-white shadow-md pr-[3rem] pl-[1rem] py-[0.5rem] text-left rounded-[8px]">
          <div className="font-[600]">Tổng số lịch Yoga</div>
          <div className="font-bold text-[#059669]">0</div>
        </div>
        <div className="flex flex-col w-[22rem] justify-center h-[5rem] bg-white shadow-md pr-[3rem] pl-[1rem] py-[0.5rem] text-left rounded-[8px]">
          <div className="font-[600]">Tổng số lịch Zumba</div>
          <div className="font-bold text-[#7C3AED]">0</div>
        </div>
      </div>

      <div className="bg-white shadow-md p-6 rounded-[8px] mb-6 h-[30rem] ">
        <Bar data={data} />
      </div>

      <div className="bg-white shadow-md p-6 rounded-[8px] mb-4">
        <div className="font-semibold text-[18px] mb-4">Bộ lọc</div>
        <Form layout="vertical" className="">
          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="Lớp học" name="courseId">
              <Select placeholder="Chọn lớp">
                <Select.Option value="all">tất cả</Select.Option>
                <Select.Option value="101">101</Select.Option>
                <Select.Option value="102">102</Select.Option>
                <Select.Option value="103">103</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Email" name="bookingDate">
              <Input placeholder="Tìm theo email" />
            </Form.Item>

            <Form.Item label="Ngày tập" name="bookingDate">
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="p-2 shadow-md bg-white rounded-2xl">
        <Table<Booking>
          columns={columns}
          dataSource={bookingData}
          bordered
          pagination={{ pageSize: 3, position: ["bottomCenter"] }}
          rowKey="id"
        />
        {selectedBooking && (
          <ModalEditBooking
            open={isEditOpen}
            bookingData={selectedBooking}
            onOk={handleEditOk}
            onCancel={handleEditCancel}
          />
        )}
      </div>
    </div>
  );
}

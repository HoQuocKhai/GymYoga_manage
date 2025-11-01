import { Table } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import "../../assets/tableBooking.css";
import type { Booking, User } from "../../types/userType";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../stores/store";
import {
  deleteBooking,
  getBooking,
  updateBooking,
} from "../../apis/booking.api";
import useFilterBooking from "../../hooks/useFilterBooking";
import Swal from "sweetalert2";
import ModalEditBooking from "../../components/forms/ModalEditBooking";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export default function TableBooking() {
  const { booking } = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch<AppDispatch>();

  const [bookingList, setBookingList] = useState<Booking[]>();

  const bookingFilterWithUser = useFilterBooking(booking);
  const user: User = JSON.parse(sessionStorage.getItem("user") || "null");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    dispatch(getBooking());
    setBookingList(booking);
  }, [bookingList]);

  const bookingData = bookingFilterWithUser?.map((item) => ({
    ...item,
    name: user?.name,
    email: user?.email,
    key: item.id,
  }));

  const handleConfirmDelete = (record: Booking) => {
    swalWithBootstrapButtons
      .fire({
        title: `Bạn có chắc muốn Xoá Lịch tập?`,
        text: ``,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Đã Xoá thành công Lịch tập!",
            text: ``,
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
            title: "Đã Huỷ xoá Lịch tập!",
            text: ``,
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
    Swal.fire({
      icon: "success",
      title: "Success!",
      showConfirmButton: false,
      text: "Đã Sửa thành công!",
      timer: 1500,
    });
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
            className="px-3 py-2 text-blue-500 duration-200 hover:-translate-y-0.5 hover:!px-4 hover:!rounded-[8px] hover:shadow-md hover:bg-blue-500 hover:text-white !rounded-[2rem]"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </button>
          <button
            className="px-3 py-2 text-red-500 duration-200 hover:-translate-y-0.5 hover:!px-4 hover:!rounded-[8px] hover:shadow-md hover:bg-red-500 hover:text-white !rounded-[2rem]"
            onClick={() => handleConfirmDelete(record)}
          >
            Xoá
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table<Booking>
        columns={columns}
        dataSource={bookingData}
        bordered
        rowKey="id"
        pagination={{ pageSize: 3, position: ["bottomCenter"] }}
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
  );
}

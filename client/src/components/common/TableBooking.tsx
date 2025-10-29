import { Modal, Pagination, Table } from "antd";
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
    key: item.id, // Antd Table wants key
  }));

  const handleConfirmDelete = (record: Booking) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteBooking(record));
          setBookingList(
            (prev) =>
              (prev = prev?.filter(
                (booking: Booking) => booking.courseId != record.courseId
              ))
          );
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
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
      // ensure bookingDate is string & coursesId/bookingTime preserved
      bookingDate: values.bookingDate ?? selectedBooking.bookingDate,
      bookingTime: values.bookingTime ?? selectedBooking.bookingTime,
      courseId: values.courseId ?? selectedBooking.courseId,
    } as Booking;

    // dispatch update
    try {
      await dispatch(updateBooking(payload)).unwrap();
      // optional: show success toast
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
            className="px-3 py-2 text-blue-500 hover:bg-blue-500 hover:text-white !rounded-md"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </button>
          <button
            className="px-3 py-2 text-red-500 hover:bg-red-500 hover:text-white !rounded-md"
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
        pagination={false}
        rowKey="id"
      />

      <Pagination
        defaultCurrent={1}
        total={50}
        className="flex flex-1 justify-center items-center m-3"
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

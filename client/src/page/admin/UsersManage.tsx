import { useEffect, useState } from "react";
import { Table, Modal, Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserlist, updateUser } from "../../apis/user.api";
import type { User } from "../../types/userType";
import type { AppDispatch, RootState } from "../../stores/store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success me-2",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export default function UsersManage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form] = Form.useForm();
  const dataUsers = users.filter((user) => user.rule != "admin");

  useEffect(() => {
    dispatch(getUserlist());
  }, [dispatch]);

  const columns: ColumnsType<User> = [
    { title: "Tên người dùng", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Mật khẩu", dataIndex: "password" },
    {
      title: "Thao tác",
      render: (_, record) => (
        <div className="flex flex-1 justify-start gap-2">
          <button
            className="px-3 py-2 text-blue-500 duration-200 hover:-translate-y-0.5 hover:!px-4 hover:!rounded-[8px] hover:shadow-md hover:bg-blue-500 hover:text-white !rounded-[2rem]"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </button>
          <button
            className="px-3 py-2 text-red-500 duration-200 hover:-translate-y-0.5 hover:!px-4 hover:!rounded-[8px] hover:shadow-md hover:bg-red-500 hover:text-white !rounded-[2rem]"
            onClick={() => handlDelete(record)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const handlDelete = (record: User) => {
    swalWithBootstrapButtons
      .fire({
        title: `Bạn có chắc muốn Xoá dịch vụ?`,
        text: `${record.name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Đã Xoá thành công dịch vụ!",
            text: `${record.name}`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(deleteUser(record.id as string));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Đã Huỷ xoá dịch vụ!",
            text: `${record.name}`,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleEdit = (record: User) => {
    setEditing(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editing) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        showConfirmButton: false,
        text: "Đã Sửa thành công!",
        timer: 1500,
      });
      dispatch(updateUser({ ...editing, ...values }));
    }
    form.resetFields();
    form.setFieldsValue(null);
    setEditing(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    form.setFieldsValue(null);
    setEditing(null);
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  return (
    <div className="pl-[16rem] pr-4 py-4 w-dvw">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <button
          onClick={() => navigate("/auth/register")}
          className="cursor-pointer transition-all !text-[0.85rem] bg-blue-500 text-white px-3 py-1 !rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Thêm người dùng
        </button>
      </div>

      <div className="shadow-md p-3 bg-white rounded-2xl">
        <Table
          columns={columns}
          dataSource={dataUsers}
          rowKey="id"
          bordered={true}
          pagination={{ pageSize: 3, position: ["bottomCenter"] }}
        />

        <Modal
          title={"Chỉnh sửa Thông tin người dùng"}
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={handleOk}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Tên người dùng"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="email" name="email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

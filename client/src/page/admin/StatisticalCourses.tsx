import { useEffect, useState } from "react";
import { Table, Modal, Form, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "../../apis/service.api";
import type { Service } from "../../types/serviceType";
import type { AppDispatch, RootState } from "../../stores/store";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success me-2",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export default function ManageService() {
  const dispatch = useDispatch<AppDispatch>();
  const { services } = useSelector((state: RootState) => state.service);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const columns: ColumnsType<Service> = [
    { title: "Tên dịch vụ", dataIndex: "name" },
    { title: "Mô tả", dataIndex: "description" },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      render: (url) => (
        <img src={url} alt="service" className="w-[80px] h-[60px]" />
      ),
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            className="px-3 py-2 text-blue-500 hover:shadow-md hover:bg-blue-500 hover:text-white !rounded-md"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </button>
          <button
            className="px-3 py-2 text-red-500 hover:shadow-md hover:bg-red-500 hover:text-white !rounded-md"
            onClick={() => handlDelete(record)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const handlDelete = (record: Service) => {
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
          dispatch(deleteService(record.id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Đã Huỷ xoá dịch vụ!",
            text: `${record.name}`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleEdit = (record: Service) => {
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
        text: "Thêm mới thành công",
        timer: 1500,
      });
      dispatch(updateService({ ...editing, ...values }));
    } else {
      dispatch(addService({ ...values }));
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

  return (
    <div className="pl-[16rem] pr-4 py-4 w-dvw">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý Dịch vụ</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Thêm dịch vụ mới
        </Button>
      </div>

      <div className="shadow-md">
        <Table
          columns={columns}
          dataSource={services}
          rowKey="id"
          bordered={true}
          pagination={{ pageSize: 3 }}
        />

        <Modal
          title={editing ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={handleOk}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Tên dịch vụ"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              label="URL Hình ảnh"
              name="imageUrl"
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

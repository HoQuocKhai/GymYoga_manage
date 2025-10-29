import { useEffect, useState } from "react";
import { Table, Modal, Form, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { getServices, addService, updateService, deleteService } from "../../apis/service.api";
import type { Service } from "../../types/serviceType";
import type { AppDispatch, RootState } from "../../stores/store";

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
      render: (url) => <img src={url} alt="service" className="w-[80px] h-[60px]" />,
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => dispatch(deleteService(record.id))}>Xóa</Button>
        </div>
      ),
    },
  ];

  const handleEdit = (record: Service) => {
    setEditing(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editing) {
      dispatch(updateService({ ...editing, ...values }));
    } else {
      dispatch(addService({ ...values }));
    }
    form.resetFields();
    setEditing(null);
    setIsModalOpen(false);
  };

  return (
    <div className="pl-[16rem] pr-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý Dịch vụ</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm dịch vụ mới</Button>
      </div>

      <Table columns={columns} dataSource={services} rowKey="id" bordered />

      <Modal
        title={editing ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleOk}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Tên dịch vụ" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="URL Hình ảnh" name="imageUrl" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

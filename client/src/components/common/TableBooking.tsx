import { Button, Modal, Pagination, Table } from "antd";
import type { TableProps } from "antd";
import { useState, type ReactNode } from "react";
import "../../assets/tableBooking.css";

interface DataType {
  key: string;
  name: string;
  money: string;
  address: string;
  action: ReactNode;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Lớp",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Ngày tập",
    className: "column-money",
    dataIndex: "money",
  },
  {
    title: "Khung giờ",
    dataIndex: "address",
  },
  {
    title: "Họ và tên",
    dataIndex: "address",
  },
  {
    title: "Email",
    dataIndex: "address",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

export default function TableBooking() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      money: "￥300,000.00",
      address: "New York No. 1 Lake Park",
      action: (
        <div>
          <Button style={{ marginRight: "10px" }} onClick={showModal}>
            Sửa
          </Button>
          <Button>Xoá</Button>
        </div>
      ),
    },
    {
      key: "2",
      name: "Jim Green",
      money: "￥1,256,000.00",
      address: "London No. 1 Lake Park",
      action: (
        <div>
          <Button style={{ marginRight: "10px" }} onClick={showModal}>
            Sửa
          </Button>
          <Button>Xoá</Button>
        </div>
      ),
    },
    {
      key: "3",
      name: "Joe Black",
      money: "￥120,000.00",
      address: "Sydney No. 1 Lake Park",
      action: (
        <div>
          <Button style={{ marginRight: "10px" }} onClick={showModal}>
            Sửa
          </Button>
          <Button>Xoá</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        // className="tableBooking"
      />

      <Pagination
        defaultCurrent={1}
        total={50}
        className="flex flex-1 justify-center items-center m-3"
      />
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

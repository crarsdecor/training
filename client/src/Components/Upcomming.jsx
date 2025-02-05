import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Table,
  DatePicker,
  TimePicker,
  message,
  Popconfirm,
} from "antd";
import axios from "axios";
import moment from "moment";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Upcoming = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  // Fetch upcoming trainings from the backend
  const fetchTrainings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/admin/getupcomingtrainings`
      );
      setTrainings(response.data.trainings);
    } catch (error) {
      message.error("Failed to fetch upcoming trainings.");
    } finally {
      setLoading(false);
    }
  };

  // Submit form data to backend
  const handleSetTraining = async (values) => {
    console.log(values);
    try {
      const formattedValues = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm"),
      };
      await axios.post(
        `${backendUrl}/admin/setupcomingtraining`,
        formattedValues
      );
      message.success("Training added successfully!");
      setIsModalVisible(false);
      form.resetFields();
      fetchTrainings(); // Refresh the list
    } catch (error) {
      message.error("Failed to add training.");
    }
  };

  // Delete training
  const handleDeleteTraining = async (_id) => {
    try {
      await axios.delete(`${backendUrl}/admin/deleteupcomingtraining/${_id}`);
      message.success("Training deleted successfully!");
      fetchTrainings(); // Refresh the list
    } catch (error) {
      message.error("Failed to delete training.");
    }
  };

  // Handle modal visibility
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  // Define table columns
  const columns = [
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (text) => (
        <a
          href={text}
          target="_blank"
          className="text-blue-500"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (time) => moment(time, "HH:mm").format("hh:mm A"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this training?"
          onConfirm={() => handleDeleteTraining(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
          Upcoming Trainings
        </h2>{" "}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
          Total: {trainings.length}
        </h2>{" "}
        <Button type="primary" onClick={showModal}>
          Set New Training
        </Button>
      </div>

      {/* Trainings Table */}
      <Table
        bordered
        dataSource={trainings}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        style={{ overflowX: "auto" }}
      />

      {/* Add Training Modal */}
      <Modal
        title="Set New Training"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSetTraining}>
          <Form.Item
            label="Topic"
            name="topic"
            rules={[{ required: true, message: "Please enter the topic!" }]}
          >
            <Input placeholder="Enter training topic" />
          </Form.Item>
          <Form.Item
            label="Link"
            name="link"
            rules={[
              { required: true, message: "Please enter the training link!" },
              { type: "url", message: "Please enter a valid URL!" },
            ]}
          >
            <Input placeholder="Enter training link" />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please select a time!" }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Upcoming;

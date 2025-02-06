import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  Form,
  message,
  Table,
  Popconfirm,
} from "antd";
import AdminLayout from "../Layouts/AdminLayout";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;

const ExploreMore = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchExploreMore();
  }, []);

  const fetchExploreMore = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/explore-more`);
      setData(response.data);
    } catch (error) {
      message.error("Failed to fetch data");
    }
  };

  const showModal = (item = null) => {
    setIsModalVisible(true);
    setEditingItem(item);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (editingItem) {
        await axios.put(
          `${backendUrl}/admin/explore-more/${editingItem._id}`,
          values
        );
        message.success("Content updated successfully!");
      } else {
        await axios.post(`${backendUrl}/admin/explore-more`, values);
        message.success("Content added successfully!");
      }
      fetchExploreMore();
      handleCancel();
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/admin/explore-more/${id}`);
      message.success("Content deleted successfully!");
      fetchExploreMore();
    } catch (error) {
      message.error("Failed to delete content");
    }
  };

  const columns = [
    {
      title: "Content Type",
      dataIndex: "contentType",
      key: "contentType",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this content?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div>
        <Button
          type="primary"
          onClick={() => showModal()}
          style={{ marginBottom: 16 }}
        >
          Add Explore More
        </Button>

        <Table
          dataSource={data}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />

        <Modal
          title={
            editingItem
              ? "Edit Explore More Content"
              : "Add Explore More Content"
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Content Type"
              name="contentType"
              rules={[
                { required: true, message: "Please select a content type" },
              ]}
            >
              <Select placeholder="Select type">
                <Option value="Theme">Theme</Option>
                <Option value="Banner">Banner</Option>
                <Option value="Image">Image</Option>
                <Option value="Video">Video</Option>
                <Option value="Manufacturing">Manufacturing</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Link"
              name="link"
              rules={[{ required: true, message: "Please enter link" }]}
            >
              <Input placeholder="Enter link" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingItem ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default ExploreMore;

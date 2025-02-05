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
import axios from "axios";
import AdminLayout from "../Layouts/AdminLayout";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;

const AdminSocialMedia = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [editingContent, setEditingContent] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");

  const showModal = (record = null) => {
    setEditingContent(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    window.location.reload();
    setIsModalVisible(false);
    setEditingContent(null);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (editingContent) {
        await axios.put(
          `${backendUrl}/admin/social-media/${editingContent._id}`,
          values
        );
        message.success("Social media content updated successfully!");
        window.location.reload();
      } else {
        await axios.post(`${backendUrl}/admin/social-media`, values);
        message.success("Social media content added successfully!");
        window.location.reload();
      }
      setIsModalVisible(false);
      getContent();
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id) => {
    try {
      await axios.delete(`${backendUrl}/admin/social-media/${id}`);
      message.success("Content deleted successfully!");
      getContent();
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const getContent = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/get-social-media`);
      setContent(response.data.content);
      setFilteredContent(response.data.content);
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  // Filter Content by Title and Type
  useEffect(() => {
    let filtered = content;

    if (searchText) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    setFilteredContent(filtered);
  }, [searchText, filterType, content]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    // {
    //   title: "Theme Link",
    //   dataIndex: "themeLink",
    //   key: "themeLink",
    //   render: (text) =>
    //     text ? (
    //       <a href={text} target="_blank" rel="noopener noreferrer">
    //         {text}
    //       </a>
    //     ) : (
    //       "N/A"
    //     ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => deleteContent(record._id)}
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
      <div className="w-full flex justify-between pb-3 px-4 bg-gradient-to-r from-blue-800 to-blue-300 shadow-lg rounded-lg">
        <h1 className="text-2xl pt-4 font-bold text-white">
          All Social Media Content
        </h1>
        <h1 className="text-2xl pt-4 font-bold text-white">
          Total: {filteredContent.length}
        </h1>
      </div>

      <div className="p-4">
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search by title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-1/3"
          />
          <Select
            placeholder="Filter by Type"
            value={filterType}
            onChange={(value) => setFilterType(value)}
            allowClear
            className="w-1/3"
          >
            <Option value="Theme">Theme</Option>
            <Option value="Banner">Banner</Option>
            <Option value="Image">Image</Option>
            <Option value="Video">Video</Option>
            <Option value="Manufacturing">Manufacturing</Option>
          </Select>
          <Button type="primary" onClick={() => showModal()}>
            Add New Social Media Content
          </Button>
        </div>

        <Table
          className="mt-4"
          dataSource={filteredContent}
          columns={columns}
          rowKey="_id"
          bordered
          scroll={{ x: true }}
        />
      </div>

      <Modal
        title={
          editingContent
            ? "Edit Social Media Content"
            : "Add Social Media Content"
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={editingContent || {}}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true, message: "Please enter link" }]}
          >
            <Input placeholder="Enter link" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Select placeholder="Select type">
              <Option value="Theme">Theme</Option>
              <Option value="Banner">Banner</Option>
              <Option value="Image">Image</Option>
              <Option value="Video">Video</Option>
              <Option value="Manufacturing">Manufacturing</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingContent ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminSocialMedia;

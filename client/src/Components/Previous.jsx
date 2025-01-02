import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Table, message, Popconfirm } from "antd";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Previous = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const [form] = Form.useForm();

  // Fetch previous videos from the backend
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/admin/getprevvideo`);
      setVideos(response.data.videos);
    } catch (error) {
      message.error("Failed to fetch videos.");
    } finally {
      setLoading(false);
    }
  };

  // Add or Update video
  const handleAddOrUpdateVideo = async (values) => {
    try {
      if (isEditing) {
        await axios.put(
          `${backendUrl}/admin/updateprevvideo/${editingVideo._id}`,
          values
        );
        message.success("Video updated successfully!");
      } else {
        await axios.post(`${backendUrl}/admin/addprevvideo`, values);
        message.success("Video added successfully!");
      }
      setIsModalVisible(false);
      form.resetFields();
      setIsEditing(false);
      setEditingVideo(null);
      fetchVideos(); // Refresh the list
    } catch (error) {
      message.error(
        isEditing ? "Failed to update video." : "Failed to add video."
      );
    }
  };

  // Delete video
  const handleDeleteVideo = async (_id) => {
    try {
      await axios.delete(`${backendUrl}/admin/deleteprevvideo/${_id}`);
      message.success("Video deleted successfully!");
      fetchVideos(); // Refresh the list
    } catch (error) {
      message.error("Failed to delete video.");
    }
  };

  // Show modal for editing
  const handleEdit = (video) => {
    setIsEditing(true);
    setEditingVideo(video);
    form.setFieldsValue(video); // Prefill the form with existing data
    setIsModalVisible(true);
  };

  // Handle modal visibility
  const showModal = () => {
    setIsEditing(false);
    setEditingVideo(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setIsEditing(false);
    setEditingVideo(null);
  };

  useEffect(() => {
    fetchVideos();
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this video?"
            onConfirm={() => handleDeleteVideo(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
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
          Previous Trainings
        </h2>

        <Button type="primary" onClick={showModal}>
          Add New Video
        </Button>
      </div>

      {/* Video Table */}
      <Table
        bordered
        dataSource={videos}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        style={{ overflowX: "auto" }}
      />

      {/* Add/Edit Video Modal */}
      <Modal
        title={isEditing ? "Edit Video" : "Add New Video"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrUpdateVideo}>
          <Form.Item
            label="Topic"
            name="topic"
            rules={[{ required: true, message: "Please enter the topic!" }]}
          >
            <Input placeholder="Enter video topic" />
          </Form.Item>
          <Form.Item
            label="Link"
            name="link"
            rules={[
              { required: true, message: "Please enter the video link!" },
              { type: "url", message: "Please enter a valid URL!" },
            ]}
          >
            <Input placeholder="Enter video link" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isEditing ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Previous;

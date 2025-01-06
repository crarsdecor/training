import React, { useState, useEffect } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Table,
  Popconfirm,
} from "antd";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Videos = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      const response = await axios.get(`${backendUrl}/admin/getCourseVideos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedVideos = response.data.videos || [];
      setVideos(fetchedVideos);
      setFilteredVideos(fetchedVideos);
    } catch (error) {
      message.error("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(query)
    );
    setFilteredVideos(filtered);
  };

  // Show modal for adding or editing
  const showModal = (video = null) => {
    setEditingVideo(video);
    if (video) {
      form.setFieldsValue(video);
    }
    setIsModalVisible(true);
  };

  // Hide the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingVideo(null);
  };

  // Handle form submission for add or edit
  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      if (editingVideo) {
        // Edit video
        await axios.put(
          `${backendUrl}/admin/updateCourseVideo/${editingVideo._id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        message.success("Video updated successfully!");
      } else {
        // Add new video
        await axios.post(`${backendUrl}/admin/addCourseVideo`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        message.success("Video added successfully!");
      }

      fetchVideos(); // Refresh video list
      setIsModalVisible(false);
      form.resetFields();
      setEditingVideo(null);
    } catch (error) {
      message.error("Failed to save video. Please try again.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      await axios.delete(`${backendUrl}/admin/deleteCourseVideo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Video deleted successfully!");
      fetchVideos();
    } catch (error) {
      message.error("Failed to delete video. Please try again.");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Video Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Course Category",
      dataIndex: "courseCategory",
      key: "courseCategory",
    },
    {
      title: "Course Type",
      dataIndex: "courseType",
      key: "courseType",
    },
    {
      title: "Video Link",
      dataIndex: "link",
      key: "link",
      render: (text) => (
        <a
          className="text-blue-500"
          href={text}
          target="_blank"
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
        <div className="flex gap-2">
          <Button
            type="link"
            onClick={() => showModal(record)}
            className="text-blue-600"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this video?"
            onConfirm={() => handleDelete(record._id)}
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
    <AdminLayout>
      <div className="p-4">
        <div className="w-full mb-8 pb-3 px-4 bg-gradient-to-r from-blue-800 to-blue-300 shadow-lg rounded-lg">
          <h1 className="text-2xl pt-4 font-bold text-white">
            All Course Videos.
          </h1>
        </div>
        <div className="flex">
          <Input
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearch}
            className="mb-4 w-64 mr-8"
          />
          <Button
            type="primary"
            onClick={() => showModal()}
            className="mb-4 bg-gradient-to-r from-blue-800 to-blue-400 text-white"
          >
            Add Video
          </Button>
        </div>

        <Modal
          title={editingVideo ? "Edit Video" : "Add New Video"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              title: "",
              courseCategory: "Amazon",
              courseType: "Beginner",
              link: "",
            }}
          >
            <Form.Item
              name="title"
              label="Video Title"
              rules={[
                { required: true, message: "Please input the video title!" },
              ]}
            >
              <Input placeholder="Enter video title" />
            </Form.Item>

            <Form.Item
              name="courseCategory"
              label="Course Category"
              rules={[
                { required: true, message: "Please select a course category!" },
              ]}
            >
              <Select>
                <Select.Option value="Amazon">Amazon</Select.Option>
                <Select.Option value="Website">Website</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="courseType"
              label="Course Type"
              rules={[
                { required: true, message: "Please select a course type!" },
              ]}
            >
              <Select>
                <Select.Option value="Beginner">Beginner</Select.Option>
                <Select.Option value="Intermediate">Intermediate</Select.Option>
                <Select.Option value="Advanced">Advanced</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="link"
              label="Video Link"
              rules={[
                { required: true, message: "Please input the video link!" },
                { type: "url", message: "Please enter a valid URL!" },
              ]}
            >
              <Input placeholder="Enter video link" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-gradient-to-r from-blue-800 to-blue-400 text-white"
              >
                {editingVideo ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Table
          dataSource={filteredVideos}
          columns={columns}
          loading={loading}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 5 }}
        />
      </div>
    </AdminLayout>
  );
};

export default Videos;

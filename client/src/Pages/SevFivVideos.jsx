import React, { useState, useEffect } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Table,
  Popconfirm,
  Select,
} from "antd";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const SevFivVideos = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [form] = Form.useForm();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState(""); // New state for course category filter

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      const response = await axios.get(`${backendUrl}/admin/getVideos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVideos(response.data.videos || []);
    } catch (error) {
      message.error("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger the fetchVideos API on component mount
  useEffect(() => {
    fetchVideos();
  }, []);

  // Show the modal for adding or editing
  const showModal = (video = null) => {
    setIsEditMode(!!video);
    setCurrentVideo(video);
    if (video) {
      form.setFieldsValue(video);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Hide the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentVideo(null);
    setIsEditMode(false);
  };

  // Handle form submission for adding or editing
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      if (isEditMode && currentVideo) {
        // Update existing video
        await axios.put(
          `${backendUrl}/admin/updateVideo/${currentVideo._id}`,
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
        await axios.post(`${backendUrl}/admin/addVideo`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        message.success("Video added successfully!");
      }

      setIsModalVisible(false);
      fetchVideos(); // Refresh the video list
      form.resetFields();
    } catch (error) {
      message.error("Failed to save video. Please try again.");
    }
  };

  // Handle video deletion
  const handleDelete = async (videoId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      await axios.delete(`${backendUrl}/admin/deleteVideo/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Video deleted successfully!");
      fetchVideos(); // Refresh the video list
    } catch (error) {
      message.error("Failed to delete video. Please try again.");
    }
  };

  // Filter videos by title and courseCategory
  const filterVideos = () => {
    return videos.filter((video) => {
      const matchesTitle = video.title
        .toLowerCase()
        .includes(filterText.toLowerCase());
      const matchesCategory = filterCategory
        ? video.courseCategory === filterCategory
        : true;
      return matchesTitle && matchesCategory;
    });
  };

  // Videos to display based on filter
  const displayedVideos = filterVideos();

  // Table columns
  const columns = [
    {
      title: "Video ID",
      dataIndex: "videoId",
      key: "videoId",
      align: "center",
    },
    {
      title: "Course Category",
      dataIndex: "courseCategory",
      key: "courseCategory",
    },
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
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <div className="flex justify-center space-x-4">
          <Button
            type="link"
            className="text-blue-500"
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this video?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" className="text-red-500">
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
        <div className="w-full flex justify-between mb-8 pb-3 px-4 bg-gradient-to-r from-blue-800 to-blue-300 shadow-lg rounded-lg">
          <h1 className="text-2xl pt-4 font-bold text-white">
            All Videos of 75 Day's Training.
          </h1>
          <h1 className="text-2xl pt-4 font-bold text-white">
            Total: {displayedVideos.length}
          </h1>
        </div>

        {/* Search Bar for Title Filter and Category Filter */}
        <div className="mb-4 flex justify-between items-center">
          <Button
            type="primary"
            onClick={() => showModal()}
            className="bg-gradient-to-r from-blue-800 to-blue-400 text-white"
          >
            Add New Video
          </Button>

          <Input
            placeholder="Search by title"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-1/3"
          />

          {/* Filter by Category */}
          <Select
            placeholder="Select category"
            value={filterCategory}
            onChange={(value) => setFilterCategory(value)}
            style={{ width: 200 }}
          >
            <Select.Option value="">All Categories</Select.Option>
            <Select.Option value="Amazon">Amazon</Select.Option>
            <Select.Option value="Website">Website</Select.Option>
          </Select>
        </div>

        {/* Modal for adding or editing video */}
        <Modal
          title={isEditMode ? "Edit Video" : "Add New Video"}
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
              link: "",
              courseCategory: "", // initial value for the category
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
              name="link"
              label="Video Link"
              rules={[
                { required: true, message: "Please input the video link!" },
              ]}
            >
              <Input placeholder="Enter video link" />
            </Form.Item>

            <Form.Item
              name="courseCategory"
              label="Course Category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select placeholder="Select course category">
                <Select.Option value="Amazon">Amazon</Select.Option>
                <Select.Option value="Website">Website</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-gradient-to-r from-blue-800 to-blue-400 text-white"
              >
                {isEditMode ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Table for displaying videos */}
        <Table
          dataSource={displayedVideos}
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

export default SevFivVideos;

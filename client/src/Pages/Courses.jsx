import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message, Card, Row, Col } from "antd";
import AdminLayout from "../Layouts/AdminLayout";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Fetch courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          message.error("Authentication token missing.");
          return;
        }

        const response = await axios.get(`${backendUrl}/admin/getAllCourses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(response.data.courses); // Assuming the response contains a `courses` array
      } catch (error) {
        message.error("Failed to fetch courses. Please try again.");
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/admin/createCourse`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Course created successfully!");
      setIsModalVisible(false);
      form.resetFields(); // Reset the form fields after successful submission

      // Optionally, refetch courses to update the list
      const updatedCourses = await axios.get(
        `${backendUrl}/admin/getAllCourses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(updatedCourses.data.courses);
    } catch (error) {
      message.error("Failed to create course. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="w-full flex justify-between mb-8 pb-3 px-4 bg-gradient-to-r from-blue-800 to-blue-300 shadow-lg rounded-lg">
          <h1 className="text-2xl pt-4 font-bold text-white">All Courses</h1>
          <h1 className="text-2xl pt-4 font-bold text-white">
            Total : {courses.length}
          </h1>
        </div>
        {/* Create Course Button */}
        <Button
          type="primary"
          onClick={showModal}
          className="mb-2 bg-gradient-to-r from-blue-800 to-blue-400 text-white"
        >
          Create New Course
        </Button>

        {/* Modal for Course Form */}
        <Modal
          title="Create a New Course"
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
              image: "",
              description: "",
              bullet1: "",
              bullet2: "",
              bullet3: "",
              bullet4: "",
            }}
          >
            {/* Form Fields */}
            <Form.Item
              name="title"
              label="Course Title"
              rules={[
                { required: true, message: "Please input the course title!" },
              ]}
            >
              <Input placeholder="Enter course title" />
            </Form.Item>

            <Form.Item
              name="image"
              label="Course Image URL"
              rules={[
                {
                  required: true,
                  message: "Please input the course image URL!",
                },
              ]}
            >
              <Input placeholder="Enter course image URL" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Course Description"
              rules={[
                {
                  required: true,
                  message: "Please input the course description!",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter course description" rows={4} />
            </Form.Item>

            <Form.Item
              name="bullet1"
              label="Bullet Point 1"
              rules={[
                {
                  required: true,
                  message: "Please input the first bullet point!",
                },
              ]}
            >
              <Input placeholder="Enter bullet point 1" />
            </Form.Item>

            <Form.Item
              name="bullet2"
              label="Bullet Point 2"
              rules={[
                {
                  required: true,
                  message: "Please input the second bullet point!",
                },
              ]}
            >
              <Input placeholder="Enter bullet point 2" />
            </Form.Item>

            <Form.Item
              name="bullet3"
              label="Bullet Point 3"
              rules={[
                {
                  required: true,
                  message: "Please input the third bullet point!",
                },
              ]}
            >
              <Input placeholder="Enter bullet point 3" />
            </Form.Item>

            <Form.Item
              name="bullet4"
              label="Bullet Point 4"
              rules={[
                {
                  required: true,
                  message: "Please input the fourth bullet point!",
                },
              ]}
            >
              <Input placeholder="Enter bullet point 4" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-gradient-to-r from-blue-800 to-blue-400 text-white"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Display Courses */}
        <Row gutter={[16, 16]} className="mt-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <Col xs={24} sm={12} md={8} lg={6} key={course._id}>
                <Card
                  hoverable
                  className="shadow-lg rounded-lg overflow-hidden"
                  cover={
                    <div className="w-full h-45 bg-gray-200 flex items-center justify-center">
                      <img
                        alt="course"
                        src={course.image}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                  }
                >
                  <h3 className="font-semibold text-xl mb-2 text-gray-800">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>{course.bullet1}</li>
                    <li>{course.bullet2}</li>
                    <li>{course.bullet3}</li>
                  </ul>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center col-span-4 text-lg text-gray-500">
              No courses available.
            </p>
          )}
        </Row>
      </div>
    </AdminLayout>
  );
};

export default Courses;

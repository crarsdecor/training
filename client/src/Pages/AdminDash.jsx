import React, { useState, useEffect } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import { Table, Skeleton, Tag, Button, message, Input } from "antd";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "tailwindcss/tailwind.css";

const { Search } = Input;

const AdminDash = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(""); // Search state

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      setError("User ID not found in localStorage.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const name = localStorage.getItem("name");
        const token = localStorage.getItem("token");
        const usersResponse = await axios.get(
          `${backendUrl}/admin/getAllUser`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { manager: name },
          }
        );
        setUsers(usersResponse.data.allUsers);
      } catch (err) {
        message.error("Error loading dashboard details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    AOS.init({
      duration: 1200,
      once: false,
    });
    AOS.refresh();
  }, [backendUrl]);

  // Handle search text change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filter users based on search text
  const filteredUsers = users.filter(
    (user) =>
      (user.name &&
        user.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.uid &&
        user.uid.toString().toLowerCase().includes(searchText.toLowerCase()))
  );

  const columns = [
    {
      title: "UID",
      dataIndex: "uid",
      key: "uid",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Phone",
      dataIndex: "primaryContact",
      key: "primaryContact",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Amazon Enrollment",
      dataIndex: "enrollmentIdAmazon",
      key: "enrollmentIdAmazon",
      render: (text) => (text ? <span>{text}</span> : <span>N/A</span>),
    },
    {
      title: "Website Enrollment",
      dataIndex: "enrollmentIdWebsite",
      key: "enrollmentIdWebsite",
      render: (text) => (text ? <span>{text}</span> : <span>N/A</span>),
    },
  ];

  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-screen">
        <div className="w-full mb-8 pb-3 px-4 bg-gradient-to-r from-blue-800 to-blue-300 shadow-lg rounded-lg">
          <h1 className="text-2xl pt-4 font-bold text-white">All Users</h1>
          <div className="mt-4 flex items-center space-x-4">
            <Search
              placeholder="Search by User ID or Name"
              allowClear
              onChange={handleSearchChange}
              style={{ maxWidth: "400px" }}
            />
          </div>
        </div>

        {loading ? (
          <Skeleton active />
        ) : filteredUsers.length > 0 ? (
          <Table
            className="w-full cursor-pointer"
            columns={columns}
            dataSource={filteredUsers}
            rowKey="userId"
            pagination={{ pageSize: 10 }}
            bordered
            scroll={{ x: true }}
          />
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDash;

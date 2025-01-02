import React, { useState, useEffect } from "react";
import UserLayout from "../Layouts/UserLayout";
import { Button, Modal, Table, Drawer, message } from "antd";
import axios from "axios";
import "tailwindcss/tailwind.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const SevFivTraining = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Fetch all videos
  const fetchVideos = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handlePlay = (link) => {
    setCurrentVideo(link);
    setDrawerVisible(false); // Close the drawer when a video is played
  };

  const columns = [
    {
      dataIndex: "title",
      key: "title",
    },

    {
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handlePlay(record.link)}>Play</Button>
      ),
    },
  ];

  return (
    <UserLayout>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Sidebar or Drawer for video list */}
        <div
          className={`${
            drawerVisible ? "" : "hidden"
          } md:block md:w-1/4 bg-gray-100 p-4 overflow-auto`}
        >
          <h2 className="text-lg font-semibold mb-4">Video List</h2>
          <Table
            dataSource={videos.map((video, index) => ({
              ...video,
              key: index,
            }))}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
        </div>

        {/* Drawer for mobile view */}
        <Drawer
          title="Video List"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          bodyStyle={{ padding: 0 }}
        >
          <div className="p-4">
            <Table
              dataSource={videos.map((video, index) => ({
                ...video,
                key: index,
              }))}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </Drawer>

        {/* Main Video Player */}
        <div className="flex-grow bg-gray-200 flex items-center justify-center md:w-3/4">
          {currentVideo ? (
            // <iframe
            //   src={currentVideo}
            //   title="Video Player"
            //   className="w-full h-full"
            //   allow="fullscreen"
            // ></iframe>
            <iframe
              sandbox="allow-same-origin allow-scripts"
              src={currentVideo}
              frameBorder="0"
              title={currentVideo.title}
              allowFullScreen
              className="w-full h-full"
              allow="autoplay; encrypted-media"
            />
          ) : (
            <p className="text-gray-500">Select a video to play.</p>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          className="fixed top-32 left-4 md:hidden z-50"
          type="primary"
          onClick={() => setDrawerVisible(!drawerVisible)}
        >
          Menu
        </Button>
      </div>
    </UserLayout>
  );
};

export default SevFivTraining;

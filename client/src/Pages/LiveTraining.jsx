import React, { useEffect, useState } from "react";
import { Card, Button, message, Radio, Space } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserLayout from "../Layouts/UserLayout";
import AOS from "aos";
import "aos/dist/aos.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const LiveTraining = () => {
  const [prevVideos, setPrevVideos] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [selectedTab, setSelectedTab] = useState("previous");
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800, // Animation duration in ms
      once: true, // Animation happens only once
    });
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/getprevvideo`);
      setPrevVideos(response.data.videos);
    } catch (error) {
      message.error("Failed to fetch previous videos.");
    }
  };

  const fetchTrainings = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/admin/getupcomingtrainings`
      );
      setTrainings(response.data.trainings);
    } catch (error) {
      message.error("Failed to fetch upcoming trainings.");
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchTrainings();
  }, []);

  const handlePlayVideo = (video) => {
    navigate(`/video-player`, { state: { video } });
  };

  return (
    <UserLayout>
      <div className="p-4">
        {/* Radio Buttons for Switching Views */}
        <Radio.Group
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
          className="mb-6"
        >
          <Radio.Button value="previous">Previous Trainings</Radio.Button>
          <Radio.Button value="upcoming">Upcoming Trainings</Radio.Button>
        </Radio.Group>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {selectedTab === "previous" &&
            prevVideos.map((video, index) => (
              <Card
                key={video._id}
                hoverable
                className="shadow-lg rounded-lg border border-gray-200 bg-white"
                cover={
                  <img
                    alt={video.topic}
                    src="data:image/jpeg;base64,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"
                    className="h-40 object-cover w-full rounded-t-lg"
                  />
                }
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`} // Adding delay for staggered animation
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {video.topic}
                </h3>
                <Button
                  type="primary"
                  block
                  onClick={() => handlePlayVideo(video.link)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  Play Now
                </Button>
              </Card>
            ))}

          {selectedTab === "upcoming" &&
            trainings.map((training, index) => (
              <Card
                key={training._id}
                hoverable
                className="shadow-lg rounded-lg border border-gray-200 bg-white"
                cover={
                  <img
                    alt={training.topic}
                    src="https://thumbs.dreamstime.com/b/upcoming-banner-template-ribbon-label-sign-sticker-195330724.jpg"
                    className="h-40 object-cover w-full rounded-t-lg"
                  />
                }
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`} // Adding delay for staggered animation
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {training.topic}
                </h3>
                <p className="text-gray-600 mb-4">{training.description}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Date:{" "}
                  {training.date
                    ? new Date(training.date).toLocaleDateString("en-GB")
                    : "TBA"}
                </p>
                <p className="text-sm text-gray-500">
                  Time: {training.time || "TBA"}
                </p>
                <Button
                  type="primary"
                  href={training.link}
                  target="_blank"
                  block
                  className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                >
                  Join Now
                </Button>
              </Card>
            ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default LiveTraining;

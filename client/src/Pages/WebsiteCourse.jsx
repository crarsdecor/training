import React, { useEffect, useState } from "react";
import {
  Layout,
  Typography,
  message,
  Card,
  Modal,
  Rate,
  Row,
  Col,
  Progress,
  Input,
  Button,
  Collapse,
} from "antd";
import axios from "axios";
import UserLayout from "../Layouts/UserLayout";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const { Text, Title } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;

const WebsiteCourse = () => {
  const [website, setWebsite] = useState(null);
  const [videos, setVideos] = useState([]);
  const [begginer, setBegginer] = useState([]);
  const [intermediate, setIntermediate] = useState([]);
  const [websiteVideo, setWebsiteVideo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [advance, setAdvance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video
  const [viewMode, setViewMode] = useState(false); // State for changing layout
  const [completedVideos, setCompletedVideos] = useState([]); // To track completed videos
  const [reviewData, setReviewData] = useState({
    rating: 0,
    userName: localStorage.getItem("name"),
    message: "",
    courseName: "Website",
  });

  const fetchWebsite = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      const response = await axios.get(`${backendUrl}/user/getWebsite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWebsite(response.data.website);
    } catch (error) {
      message.error("Failed to fetch courses. Please try again.");
    }
  };

  const isVideoCompleted = (video) => {
    const currentUserName = localStorage.getItem("name");
    return video.users?.some((user) => user.name === currentUserName);
  };

  const calculateWebsiteProgress = () => {
    const userName = localStorage.getItem("name");
    if (!userName || !websiteVideo.length) return 0;

    // Count completed videos where the user's name exists in the 'users' array
    const completedVideos = websiteVideo.filter((video) =>
      video.users.some((user) => user.name === userName)
    ).length;

    // Total video count
    const totalVideos = websiteVideo.length;

    // Calculate and return progress as a percentage
    return Math.round((completedVideos / totalVideos) * 100);
  };

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      const response = await axios.get(
        `${backendUrl}/user/getWebsiteCourseVideos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVideos(response.data.videos || []);
    } catch (error) {
      message.error("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBegginerVideos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      const response = await axios.get(
        `${backendUrl}/user/getWebsiteCourseBegginerVideos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBegginer(response.data.videos || []);
    } catch (error) {
      message.error("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchIntermediateVideos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      const response = await axios.get(
        `${backendUrl}/user/getWebsiteCourseIntermediateVideos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIntermediate(response.data.videos || []);
    } catch (error) {
      message.error("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextVideo = () => {
    const findNextVideo = (currentVideos) => {
      const currentIndex = currentVideos.findIndex(
        (video) => video._id === selectedVideo._id
      );
      return currentVideos[currentIndex + 1] || null;
    };

    let nextVideo = findNextVideo(begginer);
    if (!nextVideo) nextVideo = findNextVideo(intermediate);
    if (!nextVideo) nextVideo = findNextVideo(advance);

    if (nextVideo) {
      setSelectedVideo(nextVideo);
      localStorage.setItem("selectedVideo", JSON.stringify(nextVideo));
    } else {
      message.info("You have completed all the videos!");
    }
  };

  const fetchAdvanceVideos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      const response = await axios.get(
        `${backendUrl}/user/getWebsiteCourseAdvanceVideos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdvance(response.data.videos || []);
    } catch (error) {
      message.error("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const markVideoComplete = async (videoId) => {
    try {
      const name = localStorage.getItem("name");
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      // Send request to mark the video as complete
      await axios.post(
        `${backendUrl}/user/markVideoComplete`,
        { videoId, name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCompletedVideos((prev) => [...prev, videoId]);
      message.success("Video marked as complete.");
      window.location.reload();
    } catch (error) {
      message.error("Failed to mark video as complete. Please try again.");
    }
  };

  const fetchWebsiteVideo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token missing.");
        return;
      }

      const response = await axios.get(`${backendUrl}/user/getWebsiteVideo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWebsiteVideo(response.data.videos);
    } catch (error) {
      message.error("Failed to fetch courses. Please try again.");
    }
  };

  useEffect(() => {
    fetchWebsiteVideo();
    fetchAdvanceVideos();
    fetchIntermediateVideos();
    fetchBegginerVideos();
    fetchWebsite();
    fetchVideos();

    // Check if a video was selected previously
    const savedVideo = JSON.parse(localStorage.getItem("selectedVideo"));
    if (savedVideo) {
      setSelectedVideo(savedVideo);
      setViewMode(true);
    }
  }, []);

  const handleSubmitReview = async () => {
    if (!reviewData.rating || !reviewData.message.trim()) {
      message.error("Please provide a rating and a message.");
      return;
    }
    // console.log(reviewData);

    try {
      // Replace with your backend API endpoint
      const response = await axios.post(
        `${backendUrl}/user/add-review`,
        reviewData
      );

      if (response.status === 200) {
        message.success("Review submitted successfully!");
        setIsModalVisible(false);
        setReviewData({ rating: 0, message: "" });
      } else {
        message.error("Failed to submit review. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  const handleSelectVideo = (video) => {
    // Save the selected video in localStorage
    localStorage.setItem("selectedVideo", JSON.stringify(video));
    setSelectedVideo(video);
    setViewMode(true);
  };

  const calculateProgress = (courseId) => {
    const courseVideos = videos.filter((video) => video.courseId === courseId);
    const completedVideosCount = courseVideos.filter(
      (video) => video.completed
    ).length;
    const totalVideos = courseVideos.length;

    return totalVideos > 0
      ? Math.round((completedVideosCount / totalVideos) * 100)
      : 0;
  };

  return (
    <UserLayout>
      {!viewMode ? (
        <div className="p-4 space-y-6">
          {/* Website Courses Section */}
          {website && website.length > 0 ? (
            website.map((course) => (
              <Card key={course._id} className="mb-6 shadow-lg bg-white">
                <Row gutter={[16, 16]} align="middle">
                  {/* Image Column */}
                  <Col xs={24} sm={8}>
                    <img
                      src={course.image}
                      alt={course.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  </Col>

                  {/* Text Column */}
                  <Col xs={24} sm={16}>
                    <Title level={4}>{course.title}</Title>
                    <Text type="secondary">{course.description}</Text>
                    <div className="mt-4 text-sm text-gray-500">
                      <ul className="list-disc pl-5">
                        <li>{course.bullet1}</li>
                        <li>{course.bullet2}</li>
                        <li>{course.bullet3}</li>
                        <li>{course.bullet4}</li>
                      </ul>
                    </div>

                    {/* Tracker */}
                    <div className="mt-4">
                      <Text>Course Progress:</Text>
                      <Progress
                        percent={calculateWebsiteProgress(course)}
                        status="active"
                        className="mt-2"
                      />
                    </div>
                  </Col>
                </Row>
              </Card>
            ))
          ) : (
            <Text type="secondary">No courses available.</Text>
          )}

          {/* Beginner, Intermediate, Advanced Videos Section with Collapse */}
          <div className="mt-8">
            <Title level={3}>Course Videos</Title>
            <Collapse defaultActiveKey={["1", "2", "3"]}>
              <Panel header="Beginner Videos" key="1">
                {begginer.map((video) => (
                  <Card
                    key={video._id}
                    className="mb-4"
                    style={{ cursor: "pointer" }}
                  >
                    <Row align="middle">
                      <Col span={20}>
                        <Text>
                          {video.title}{" "}
                          {isVideoCompleted(video) && (
                            <span style={{ color: "green", marginLeft: "8px" }}>
                              ✔️
                            </span>
                          )}
                        </Text>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="primary"
                          onClick={() => handleSelectVideo(video)}
                        >
                          Play
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Panel>

              <Panel header="Intermediate Videos" key="2">
                {intermediate.map((video) => (
                  <Card
                    key={video._id}
                    className="mb-4"
                    style={{ cursor: "pointer" }}
                  >
                    <Row align="middle">
                      <Col span={20}>
                        <Text>
                          {video.title}{" "}
                          {isVideoCompleted(video) && (
                            <span style={{ color: "green", marginLeft: "8px" }}>
                              ✔️
                            </span>
                          )}
                        </Text>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="primary"
                          onClick={() => handleSelectVideo(video)}
                        >
                          Play
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Panel>

              <Panel header="Advanced Videos" key="3">
                {advance.map((video) => (
                  <Card
                    key={video._id}
                    className="mb-4"
                    style={{ cursor: "pointer" }}
                  >
                    <Row align="middle">
                      <Col span={20}>
                        <Text>
                          {video.title}{" "}
                          {isVideoCompleted(video) && (
                            <span style={{ color: "green", marginLeft: "8px" }}>
                              ✔️
                            </span>
                          )}
                        </Text>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="primary"
                          onClick={() => handleSelectVideo(video)}
                        >
                          Play
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Panel>
            </Collapse>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row h-screen">
          {/* Left Sidebar for Video List */}
          <div className="lg:w-1/3 w-full lg:h-auto h-[50vh] overflow-y-auto border-r border-gray-300 p-4">
            <Title level={4} className="font-bold">
              Course Videos
            </Title>

            {/* Beginner, Intermediate, Advanced Video Categories with Collapsable */}
            <Collapse defaultActiveKey={["1", "2", "3"]}>
              <Panel header="Beginner Videos" key="1">
                {begginer.map((video, index) => (
                  <Card
                    key={video._id}
                    style={{
                      cursor: "pointer",
                      height: "50px",
                      padding: "0 16px", // Remove vertical padding
                      display: "flex",
                      alignItems: "center", // Vertically center
                    }}
                    onClick={() => handleSelectVideo(video)}
                  >
                    <Text>
                      <span>
                        {" "}
                        {index + 1}. {/* Serial number */}
                      </span>
                      {video.title}{" "}
                      {isVideoCompleted(video) && (
                        <span style={{ color: "green", marginLeft: "8px" }}>
                          ✔️
                        </span>
                      )}
                    </Text>
                  </Card>
                ))}
              </Panel>

              <Panel header="Intermediate Videos" key="2">
                {intermediate.map((video, index) => (
                  <Card
                    key={video._id}
                    style={{
                      cursor: "pointer", // Pointer cursor on hover
                      height: "50px", // Fixed height of 50px
                      padding: "0 16px", // Horizontal padding, no vertical padding
                      display: "flex", // Flexbox for layout
                      alignItems: "center", // Vertically center content
                    }}
                    onClick={() => handleSelectVideo(video)}
                  >
                    <Text>
                      <span>
                        {index + 1}. {/* Serial number */}
                      </span>
                      {video.title}{" "}
                      {isVideoCompleted(video) && (
                        <span style={{ color: "green", marginLeft: "8px" }}>
                          ✔️
                        </span>
                      )}
                    </Text>
                  </Card>
                ))}
              </Panel>

              <Panel header="Advanced Videos" key="3">
                {advance.map((video, index) => (
                  <Card
                    key={video._id}
                    style={{
                      cursor: "pointer", // Pointer cursor on hover
                      height: "50px", // Fixed height of 50px
                      padding: "0 16px", // Horizontal padding, no vertical padding
                      display: "flex", // Flexbox for layout
                      alignItems: "center", // Vertically center content
                    }}
                    onClick={() => handleSelectVideo(video)}
                  >
                    <Text>
                      <span>
                        {index + 1}. {/* Serial number */}
                      </span>
                      {video.title}{" "}
                      {isVideoCompleted(video) && (
                        <span style={{ color: "green", marginLeft: "8px" }}>
                          ✔️
                        </span>
                      )}
                    </Text>
                  </Card>
                ))}
              </Panel>
            </Collapse>
          </div>

          {/* Right Video Player */}
          <div className="lg:w-2/3 w-full lg:h-auto h-[50vh]">
            {/* Mark Complete Button */}
            {selectedVideo && (
              <div className="flex justify-end space-x-4">
                {website && website.length > 0 ? (
                  website.map((course) => (
                    <div className="w-full px-4">
                      <Text>Course Progress:</Text>
                      <Progress
                        percent={calculateWebsiteProgress(course)}
                        status="active"
                      />
                    </div>
                  ))
                ) : (
                  <Text type="secondary">No courses available.</Text>
                )}
                <Button
                  type="primary"
                  onClick={() => markVideoComplete(selectedVideo._id)}
                >
                  Mark Complete
                </Button>
                <Button
                  type="default"
                  onClick={handleNextVideo}
                  disabled={
                    !begginer.length && !intermediate.length && !advance.length
                  }
                >
                  Next Video
                </Button>
              </div>
            )}

            {selectedVideo ? (
              <iframe
                sandbox="allow-same-origin allow-scripts"
                src={selectedVideo.link}
                frameBorder="0"
                title={selectedVideo.title}
                allowFullScreen
                className="w-full h-[50vh] sm:h-[70vh] mt-6 sm:mt-8 lg:mt-4"
                allow="autoplay; encrypted-media"
              />
            ) : (
              <Text type="secondary">Select a video to play</Text>
            )}
            <Button
              type="primary"
              className="mt-8 absolute mr-8"
              onClick={() => setIsModalVisible(true)}
            >
              Rate Course
            </Button>
          </div>
          <Modal
            title="Submit Review"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleSubmitReview}
                disabled={!reviewData.rating || !reviewData.message.trim()}
              >
                Submit
              </Button>,
            ]}
          >
            <div className="space-y-4">
              <div>
                <label className="block font-semibold">Rating</label>
                <Rate
                  value={reviewData.rating}
                  onChange={(value) =>
                    setReviewData((prev) => ({ ...prev, rating: value }))
                  }
                />
              </div>
              <div>
                <label className="block font-semibold">Message</label>
                <TextArea
                  rows={4}
                  value={reviewData.message}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </Modal>
        </div>
      )}
    </UserLayout>
  );
};

export default WebsiteCourse;

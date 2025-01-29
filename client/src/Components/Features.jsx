import React, { useState } from "react";
import { List } from "antd";
import "tailwindcss/tailwind.css";
import TopicIcon from "@mui/icons-material/Topic";
import ShortTrainingIcon from "@mui/icons-material/FastForward";
import UpdateIcon from "@mui/icons-material/Update";
import ImfwIcon from "@mui/icons-material/School";
import SocialMediaIcon from "@mui/icons-material/Public";
import "aos/dist/aos.css";
import AOS from "aos";

const Features = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const topics = [
    {
      title: "Exclusive Topics",
      videoLink: "/exclusivetopic.mp4",
      icon: <TopicIcon />,
    },
    {
      title: "Short Trainings",
      videoLink: "/shortTraining.mp4",
      icon: <ShortTrainingIcon />,
    },
    {
      title: "Regular Updates",
      videoLink: "/regularUpdates.mp4",
      icon: <UpdateIcon />,
    },
    {
      title: "IMFW",
      videoLink: "/imfw.mp4",
      icon: <ImfwIcon />,
    },
    {
      title: "Social Media Content",
      videoLink: "/socialMediaContert.mp4",
      icon: <SocialMediaIcon />,
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState(topics[0].videoLink);

  const handleTopicClick = (videoLink) => {
    setSelectedVideo(videoLink);
  };

  return (
    <>
      <div className="p-4">
        <div className="w-full mx-auto pb-2 px-4 bg-gradient-to-r mb-3 from-blue-500 to-red-300 shadow-lg rounded-lg">
          <h1 className="text-2xl text-center p-4 font-bold text-white">
            Why Choose Us
          </h1>
        </div>{" "}
      </div>
      <div className="flex flex-col md:flex-row h-[80vh]">
        {/* Left Side */}
        <div className="w-full md:w-1/3 mt-4 p-4" data-aos="fade-up">
          <List
            dataSource={topics}
            renderItem={(item) => (
              <List.Item
                className="cursor-pointer m-7 hover:bg-blue-50 flex items-center font-bold"
                onClick={() => handleTopicClick(item.videoLink)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.title}
              </List.Item>
            )}
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-2/3 bg-white p-4" data-aos="fade-up">
          {selectedVideo ? (
            // <iframe
            //   sandbox="allow-same-origin allow-scripts"
            //   src={selectedVideo}
            //   allowFullScreen
            //   className="w-full h-[35vh] sm:h-[70vh] mt-6 sm:mt-8 lg:mt-4"
            //   allow="autoplay; encrypted-media"
            // />
            <video
              src={selectedVideo}
              className="w-full h-398"
              autoPlay
              loop
              muted
              controls
            ></video>
          ) : (
            <p className="text-gray-500">Select a topic to play the video.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Features;

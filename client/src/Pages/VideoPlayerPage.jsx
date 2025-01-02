import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import UserLayout from "../Layouts/UserLayout";

const VideoPlayerPage = () => {
  const location = useLocation();
  const videoLink = location.state?.video;

  if (!videoLink) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">
            No video link provided.
          </h1>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="flex flex-col h-screen bg-gray-100">
        <Button
          type="default"
          className="mb-2 w-24 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white mt-4 sm:mt-1"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
        <iframe
          sandbox="allow-same-origin allow-scripts"
          src={videoLink}
          frameBorder="0"
          allowFullScreen
          className="w-full h-[50vh] sm:h-[80vh] mt-6 sm:mt-8 lg:mt-4"
          allow="autoplay; encrypted-media"
        />
      </div>
    </UserLayout>
  );
};

export default VideoPlayerPage;

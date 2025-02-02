import React from "react";
import { Card } from "antd";
import { Button } from "antd";
import UserLayout from "../Layouts/UserLayout";

const RegularUpdate = () => {
  return (
    <UserLayout>
      <div className="w-full mx-auto pb-2 px-4 bg-gradient-to-r mb-3 from-blue-500 to-red-300 shadow-lg rounded-lg">
        <h1 className="text-2xl text-start p-4 font-bold text-white">
          Regular Updates
        </h1>
      </div>{" "}
      <div className="container mx-auto p-4">
        {/* Second Section: Videos */}
        <div className="p-4">
          {/* Video Container */}
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide ">
            {/* Video 1 */}
            <div className="flex-none w-64 rounded-lg">
              <video
                src="/review1.mp4"
                className="w-full h-395 rounded-lg"
                autoPlay
                loop
                muted
                controls
              ></video>
              {/* <iframe
            width="100%"
            sandbox="allow-same-origin allow-scripts"
            height="200"
            src="https://drive.google.com/file/d/1k3qshqy7FE0Rrm1KRN39BSkqYgCmgTx9/preview"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe> */}
            </div>

            {/* Video 2 */}
            <div className="flex-none w-64 rounded-lg">
              <video
                src="/review2.mp4"
                className="w-full h-395 rounded-lg"
                autoPlay
                loop
                muted
                controls
              ></video>
            </div>

            {/* Video 3 */}
            <div className="flex-none w-64 rounded-lg">
              <video
                src="/review6.mp4"
                className="w-full h-395 rounded-lg"
                autoPlay
                loop
                muted
                controls
              ></video>
            </div>

            {/* Video 4 */}
            <div className="flex-none w-64 rounded-lg">
              <video
                src="/review4.mp4"
                className="w-full h-395 rounded-lg"
                autoPlay
                loop
                muted
                controls
              ></video>
            </div>

            {/* Video 5 */}
            <div className="flex-none w-64 rounded-lg">
              <video
                src="/review5.mp4"
                className="w-full h-395 rounded-lg"
                autoPlay
                loop
                muted
                controls
              ></video>
            </div>
          </div>

          {/* Join Now Button */}
          <div className="text-center mt-6">
            <Button
              onClick={() => {
                const phoneNumber = "7300054369";
                const message = encodeURIComponent(
                  "Hi, I would like to chat about enrollment."
                );
                window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
              }}
              type="primary"
              className="w-full md:w-auto"
            >
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default RegularUpdate;

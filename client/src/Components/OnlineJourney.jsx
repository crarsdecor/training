import React from "react";
import { Button } from "antd";

const OnlineJourney = () => {
  return (
    <div className="p-4">
      {/* Title */}
      <div className="w-full mb-8 mx-auto pb-2 px-4 bg-gradient-to-r mb-3 from-blue-500 to-red-300 shadow-lg rounded-lg">
        <h1 className="text-2xl text-center p-4 font-bold text-white">
          Online Journey
        </h1>
      </div>{" "}
      {/* Video Container */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {/* Video 1 */}
        <div className="flex-none w-56 shadow-lg rounded-b-lg">
          <video
            src="/content.mp4"
            className="w-full h-398"
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
          <p className="pl-4 mt-2 font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent text-lg">
            Products
          </p>
          <p className="text-sm pl-4 pb-4 rounded-b-lg">
            We have more than 1 lac plus products
          </p>
        </div>

        {/* Video 3 */}
        <div className="flex-none w-56 shadow-lg rounded-b-lg">
          <video
            src="/accountCC.mp4"
            className="w-full h-398"
            autoPlay
            loop
            muted
            controls
          ></video>
          <p className="pl-4 mt-2 font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent text-lg">
            Account Creation & Listings
          </p>
          <p className="text-sm pl-4 pb-4 rounded-b-lg">
            We have more than 1 lac plus products
          </p>
        </div>

        {/* Video 4 */}
        <div className="flex-none w-56 shadow-lg rounded-b-lg">
          <video
            src="/support.mp4"
            className="w-full h-398"
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
          <p className="pl-4 mt-2 font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent text-lg">
            Support
          </p>
          <p className="text-sm pl-4 pb-4 rounded-b-lg">
            We have more than 1 lac plus products
          </p>
        </div>

        {/* Video 5 */}
        <div className="flex-none w-56 shadow-lg rounded-b-lg">
          <video
            src="/content 2.mp4"
            className="w-full h-398"
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
          <p className="pl-4 mt-2 font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent text-lg">
            Content
          </p>
          <p className="text-sm pl-4 pb-4 rounded-b-lg">
            demonstrations to teach specific behaviors effectively.
          </p>
        </div>
        <div className="flex-none w-56 shadow-lg rounded-b-lg">
          <video
            src="/learning.mp4"
            className="w-full h-398"
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
          <p className="pl-4 mt-2 font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent text-lg">
            Learnings
          </p>
          <p className="text-sm pl-4 pb-4 rounded-b-lg">
            demonstrations to teach specific behaviors effectively.
          </p>
        </div>
      </div>
      {/* Join Now Button */}
      <div className="text-center mt-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">
          ALL ELEMENTS ARE REQUIRED FOR GROWTH
        </h1>
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
  );
};

export default OnlineJourney;

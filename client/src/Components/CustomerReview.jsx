import React from "react";
import { Card } from "antd";
import { Button } from "antd";

const CustomerReview = () => {
  return (
    <>
      <div className="p-4 mt-28">
        <div className="w-full mx-auto pb-2 px-4 bg-gradient-to-r mb-3 from-blue-500 to-red-300 shadow-lg rounded-lg">
          <h1 className="text-2xl text-center p-4 font-bold text-white">
            What Our Customer Says
          </h1>
        </div>{" "}
      </div>
      <div className="container mx-auto p-4">
        {/* First Section: Split into two halves */}
        <div className="lg:flex items-center space-x-8">
          {/* Left Half (Image) */}
          <div className="lg:w-1/2 mb-8 lg:mb-0 overflow-x-scroll scroll-snap-x flex snap-mandatory snap-x space-x-4 scrollbar-hide relative">
            <video
              src="/reviewLand1.mp4"
              className="w-full h-398 snap-center shadow-lg rounded-lg"
              autoPlay
              loop
              muted
              controls
            ></video>
            <video
              src="/reviewLand2.mp4"
              className="w-full h-398 snap-center rounded-lg"
              autoPlay
              loop
              muted
              controls
            ></video>
            <video
              src="/reviewLand3.mp4"
              className="w-full h-398 snap-center rounded-lg"
              autoPlay
              loop
              muted
              controls
            ></video>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
            </div>
          </div>

          {/* Right Half (Content) */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Customer Review</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              excepturi commodi nam velit minima nesciunt, laboriosam nihil
              voluptates consectetur fuga porro recusandae itaque tempore sed
              praesentium alias, nostrum blanditiis cupiditate adipisci libero
              hic sint earum saepe! Reprehenderit ab commodi officiis explicabo
              tempore, eos at rem distinctio libero ullam est, optio quibusdam
              laborum quas soluta eum provident culpa maxime odio dignissimos,
              repellat quae! Perspiciatis natus quas cumque nihil ipsum rem amet
              nulla adipisci molestias labore! Maiores perspiciatis eius aperiam
              pariatur officia, unde, amet iure et quas beatae esse ut. Ipsam
              esse hic quo aliquid consequuntur numquam voluptates nam modi ex
              dicta.
            </p>
          </div>
        </div>

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
    </>
  );
};

export default CustomerReview;

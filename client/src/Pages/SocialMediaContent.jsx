import React from "react";
import UserLayout from "../Layouts/UserLayout";
import { FaSearch, FaPalette, FaImage, FaVideo, FaCogs } from "react-icons/fa";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const SocialMediaContent = () => {
  const navigate = useNavigate();
  return (
    <UserLayout>
      {/* Banner Section */}
      <div
        className="relative h-96 bg-cover bg-center rounded-lg flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage: "url('/social-media-banner.png')",
        }}
      >
        <h1 className="text-3xl font-semibold relative z-10">
          Make It Happen With Saumic Craft
        </h1>
        <div className="relative z-10 w-full max-w-2xl mt-5 flex bg-white rounded-full overflow-hidden shadow-md">
          <span className="flex items-center justify-center px-4 text-gray-500">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search here"
            className="w-full p-3 text-gray-900 outline-none"
          />
          <button className="bg-blue-500 text-white px-6 py-3 rounded-r-full font-semibold">
            Search
          </button>
        </div>
      </div>

      {/* Tabs and Scrollable Section */}
      <div className="mt-10">
        <Tabs defaultActiveKey="1" className="ant-tabs-tab-bar ant-tabs-line">
          <TabPane
            tab={
              <span className="flex items-center space-x-2">
                <FaPalette className="text-blue-500" />
                <span>Themes</span>
              </span>
            }
            key="1"
          />
          <TabPane
            tab={
              <span className="flex items-center space-x-2">
                <FaImage className="text-blue-500" />
                <span>Banner</span>
              </span>
            }
            key="2"
          />
          <TabPane
            tab={
              <span className="flex items-center space-x-2">
                <FaImage className="text-blue-500" />
                <span>Product Images</span>
              </span>
            }
            key="3"
          />
          <TabPane
            tab={
              <span className="flex items-center space-x-2">
                <FaVideo className="text-blue-500" />
                <span>Product Videos</span>
              </span>
            }
            key="4"
          />
          <TabPane
            tab={
              <span className="flex items-center space-x-2">
                <FaCogs className="text-blue-500" />
                <span>Manufacturing</span>
              </span>
            }
            key="5"
          />
        </Tabs>

        {/* Scrollable Cards Section */}
        <div className="mt-4 overflow-x-auto flex space-x-4 pb-4">
          {/* Themes Card */}
          <div
            onClick={() => {
              navigate("/themes");
            }}
            className="min-w-[300px] cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: "url('/theme.jpeg')" }}
            >
              <div className="absolute bottom-0 w-full bg-black text-xl bg-opacity-60 font-semibold text-white text-start p-2">
                Themes
              </div>
            </div>
          </div>

          {/* Banner Card */}
          <div
            onClick={() => {
              navigate("/banner");
            }}
            className="min-w-[300px] cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="h-40 relative">
              {/* Background image with reduced opacity */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: "url('/bannerSocial2.webp')" }}
              ></div>
              {/* Dark overlay to further reduce background image opacity */}
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              {/* Banner text with increased opacity */}
              <div className="absolute bottom-0 w-full bg-black text-xl bg-opacity-60 font-semibold text-white text-start p-2">
                Banner
              </div>
            </div>
          </div>

          {/* Product Images Card */}
          <div
            onClick={() => {
              navigate("/product-images");
            }}
            className="min-w-[300px] cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: "url('/productImage.webp')" }}
            >
              <div className="absolute bottom-0 w-full bg-black text-xl bg-opacity-60 font-semibold text-white text-start p-2">
                Product Images
              </div>
            </div>
          </div>

          {/* Product Videos Card */}
          <div
            onClick={() => {
              navigate("/product-videos");
            }}
            className="min-w-[300px] cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: "url('/productVideo.webp')" }}
            >
              <div className="absolute bottom-0 w-full bg-black text-xl bg-opacity-60 font-semibold text-white text-start p-2">
                Product Videos
              </div>
            </div>
          </div>

          {/* Manufacturing Card */}
          <div
            onClick={() => {
              navigate("/manufacturing");
            }}
            className="min-w-[300px] cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div
              className="h-40 bg-cover bg-center"
              style={{
                backgroundImage: "url('/manufaturing.jpg')",
              }}
            >
              <div className="absolute bottom-0 w-full bg-black text-xl bg-opacity-60 font-semibold text-white text-start p-2">
                Manufacturing
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default SocialMediaContent;

import React from "react";
import UserLayout from "../Layouts/UserLayout";
import ServiceCards from "./ServiceCards";
import {
  FaLayerGroup,
  FaRegCheckCircle,
  FaBolt,
  FaCommentDollar,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLayerGroup size={40} />,
    title: "Access a pool of top talent across 700 categories",
  },
  {
    icon: <FaRegCheckCircle size={40} />,
    title: "Enjoy a simple, easy-to-use matching experience",
  },
  {
    icon: <FaBolt size={40} />,
    title: "Get quality work done quickly and within budget",
  },
  {
    icon: <FaCommentDollar size={40} />,
    title: "Only pay when you're happy",
  },
];

const SocialMediaContent = () => {
  return (
    <UserLayout>
      {/* Service Cards Section */}
      <ServiceCards />

      {/* Freelancer Features Section */}
      <div className="text-center bg-white py-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-black">
          Make it all happen with Saumic Craft
        </h2>

        <div className="flex justify-center items-center gap-12 mt-8 flex-wrap">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-64 text-center"
            >
              <div className="text-green-600">{feature.icon}</div>
              <p className="mt-4 text-black">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default SocialMediaContent;

import React, { useEffect, useState } from "react";
import { Button, Card, Divider } from "antd";
import "tailwindcss/tailwind.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CourseTemplate = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const navigate = useNavigate();

  const handleShowMore = () => {
    setShowMoreFeatures(!showMoreFeatures);
  };

  return (
    <>
      <div data-aos="fade-up" className="p-4">
        <div className="w-full mx-auto pb-2 px-4 bg-gradient-to-r mb-3 from-blue-500 to-red-300 shadow-lg rounded-lg">
          <h1 className="text-2xl text-center p-4 font-bold text-white">
            Our Courses
          </h1>
        </div>{" "}
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-6 mb-8">
        {/* Amazon Section */}
        <Card
          title="Amazon Course Overview"
          bordered
          className="w-full md:w-1/4 bg-gradient-to-r from-red-100 to-blue-100 shadow-md rounded-lg"
          data-aos="flip-left"
        >
          {/* <video
            controls
            className="w-full rounded mb-4 border border-gray-300"
          >
            <source
              src="https://drive.google.com/file/d/1k3qshqy7FE0Rrm1KRN39BSkqYgCmgTx9/preview"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video> */}
          <video src="/amazonCourse.mp4" autoPlay loop muted controls></video>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <p className="pt-4 font-bold">
              Amazon 21 Days : From Basic to Advance All you need to know about
              Amazon
            </p>
          </ul>
          <div className="flex gap-4 mb-4">
            <Button
              onClick={() => {
                navigate("/login");
              }}
              type="primary"
              className="w-full md:w-auto"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                const phoneNumber = "7300054369";
                const message = encodeURIComponent(
                  "Hi, I would like to chat about enrollment."
                );
                window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
              }}
              type="default"
              className="w-full md:w-auto"
            >
              Enroll Now
            </Button>
          </div>
          <h1 className="text-lg font-semibold">Features</h1>
          <ul className="list-inside text-gray-700">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔️</span>
              Optimized Listings
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔️</span>
              Keyword Research
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔️</span>
              Amazon PPC (Advertisements)
            </li>
            {showMoreFeatures && (
              <>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  ADS Optimization
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  Organic sales: How to Increase
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔️</span>
                  Saumic Launch Strategy
                </li>
              </>
            )}
          </ul>

          <Button type="link" onClick={handleShowMore} className="mt-2">
            {showMoreFeatures ? "Show Less" : "Show More"}
          </Button>
        </Card>

        {/* Website Section */}
        <Card
          title="Website Course Overview"
          bordered
          className="w-full md:w-1/4 bg-gradient-to-r from-red-100 to-blue-100 shadow-md rounded-lg"
          data-aos="flip-left"
        >
          <video src="/websiteCourse.mp4" autoPlay loop muted controls></video>

          <ul className="list-inside text-gray-700 mb-4">
            <li>
              <span className="text-green-500 mr-2">✔️</span>Build a
              professional website
            </li>
            <li>
              <span className="text-green-500 mr-2">✔️</span>Master web
              development basics
            </li>
            <li>
              <span className="text-green-500 mr-2">✔️</span>Understand UI/UX
              design
            </li>
          </ul>
          <div className="flex gap-4 mb-4">
            <Button type="primary" className="w-full md:w-auto">
              Login
            </Button>
            <Button
              onClick={() => {
                const phoneNumber = "7300054369";
                const message = encodeURIComponent(
                  "Hi, I would like to chat about enrollment."
                );
                window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
              }}
              type="default"
              className="w-full md:w-auto"
            >
              Enroll Now
            </Button>
          </div>
          <h1 className="text-lg font-semibold">Features</h1>
          <ul className="list-inside text-gray-700">
            <li>
              {" "}
              <span className="text-green-500 mr-2">✔️</span>
              Interactive coding exercises
            </li>
            <li>
              <span className="text-green-500 mr-2">✔️</span>Access to templates
            </li>
            <li>
              <span className="text-green-500 mr-2">✔️</span>Responsive design
              techniques
            </li>
            {showMoreFeatures && (
              <>
                <li>
                  <span className="text-green-500 mr-2">✔️</span>Backend
                  integration
                </li>
                <li>
                  <span className="text-green-500 mr-2">✔️</span>SEO
                  optimization
                </li>
                <li>
                  <span className="text-green-500 mr-2">✔️</span>Performance
                  monitoring tools
                </li>
                <li>
                  <span className="text-green-500 mr-2">✔️</span>Custom domain
                  setup
                </li>
                <li>
                  <span className="text-green-500 mr-2">✔️</span>Cloud hosting
                  guidance
                </li>
              </>
            )}
          </ul>
          <Button type="link" onClick={handleShowMore} className="mt-2">
            {showMoreFeatures ? "Show Less" : "Show More"}
          </Button>
        </Card>
      </div>
    </>
  );
};

export default CourseTemplate;

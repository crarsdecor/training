import React, { useState } from "react";
import { Card, Input } from "antd";
import { useNavigate } from "react-router-dom";

const services = [
  { title: "Themes", img: "🎨" },
  { title: "Banner", img: "🖼️" },
  { title: "Product Images", img: "📷" },
  { title: "Product Videos", img: "🎥" },
  { title: "Manufacturing", img: "🏭" },
];

const ServiceCards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCardClick = (title) => {
    navigate(`/${title.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 mb-4 bg-white min-h-50% rounded-lg">
      {/* Header Section */}
      <div className="w-full px-4 bg-gradient-to-r from-blue-500 to-red-300 shadow-lg rounded-lg">
        <h1 className="text-2xl p-4 font-bold text-white">
          Our Premium Services
        </h1>
      </div>
      {/* Search Input */}
      <div className="mt-4 w-64">
        <Input.Search
          placeholder="Search anything here..."
          onSearch={handleSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          enterButton
        />
      </div>

      {/* Scrolling Cards */}
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide p-6">
        {filteredServices.map((service, index) => (
          <Card
            key={index}
            className="w-72 min-w-[18rem] cursor-pointer border border-gray-300 p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex-shrink-0"
            onClick={() => handleCardClick(service.title)}
          >
            <div className="flex flex-col items-center">
              <span className="text-5xl">{service.img}</span>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {service.title}
              </h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;

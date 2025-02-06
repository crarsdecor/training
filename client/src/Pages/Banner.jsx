import React, { useEffect, useState } from "react";
import { Card, Spin, message, Modal, Button, Input } from "antd";
import { FaSearch, FaPalette, FaImage, FaVideo, FaCogs } from "react-icons/fa";

import axios from "axios";
import UserLayout from "../Layouts/UserLayout";
import { DownloadOutlined } from "@ant-design/icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Banner = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const fetchExploreMore = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/explore-more`);

      // Filter only the items where contentType is "Theme"
      const filteredData = response.data.filter(
        (item) => item.contentType === "Banner"
      );

      setData(filteredData);
    } catch (error) {
      message.error("Failed to fetch data");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/user/get-all-banner`);
      setProducts(response.data.images);
      setFilteredProducts(response.data.images); // Initially show all products
    } catch (error) {
      message.error("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    fetchExploreMore();
  }, []);

  // Filter images based on the search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setFilteredProducts(products); // If search is empty, show all products
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleDownload = (imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "downloaded-image.jpg"; // Optionally set this to something dynamic
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <UserLayout>
      <div
        className="relative h-96 bg-cover bg-center rounded-lg flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage: "url('/social-media-banner.png')",
        }}
      >
        <h1 className="text-3xl font-semibold relative z-10">
          Choose And Download Your Favorate <br />
          Banner From Our Top Collection
        </h1>
        <div className="relative z-10 w-full max-w-2xl mt-5 flex bg-white rounded-full overflow-hidden shadow-md">
          <span className="flex items-center justify-center px-4 text-gray-500">
            <FaSearch />
          </span>
          <input
            type="text"
            value={searchQuery}
            placeholder="Search here"
            onChange={handleSearch}
            className="w-full p-3 text-gray-900 outline-none"
          />
          <button className="bg-blue-500 text-white px-6 py-3 rounded-r-full font-semibold">
            Search
          </button>
        </div>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="relative rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 h-full w-full cursor-pointer"
                onClick={() => handleImageClick(product)}
              >
                <div className="relative w-full h-[200px]">
                  <img
                    alt={product.title}
                    src={product.link}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 w-full bg-black text-xl bg-opacity-60 font-semibold text-white text-start p-2">
                    {product.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button
          type="primary"
          className="mt-4"
          onClick={() => {
            data.forEach((item) => {
              window.open(item.link, "_blank"); // Opens each link in a new tab
            });
          }}
        >
          Explore more..
        </Button>

        {/* Modal for full image view */}
        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
          centered
        >
          <div className="flex flex-col items-center">
            {selectedImage && (
              <>
                <img
                  src={selectedImage.link}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-lg"
                />
                <h2 className="mt-4 text-lg font-semibold">
                  {selectedImage.title}
                </h2>
                <Button
                  type="primary"
                  className="mt-4 flex items-center gap-2"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(selectedImage.link)}
                >
                  Download
                </Button>
              </>
            )}
          </div>
        </Modal>
      </div>
    </UserLayout>
  );
};

export default Banner;

import React, { useEffect, useState } from "react";
import { Card, Spin, message, Modal, Button, Input } from "antd";
import axios from "axios";
import UserLayout from "../Layouts/UserLayout";
import { DownloadOutlined } from "@ant-design/icons";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Manufacturing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/user/get-all-manufacturing`
      );
      setProducts(response.data.images);
      setFilteredProducts(response.data.images); // Initially show all products
    } catch (error) {
      message.error("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
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
      <div className="p-6">
        <div className="w-full mb-2 pb-8 px-8 bg-gradient-to-r from-blue-500 to-red-300 shadow-lg rounded-lg">
          <h1 className="text-2xl pt-8 font-bold text-white">
            Enhace Your Website With Our Best Manufacturing Videos
          </h1>
        </div>
        {/* Search Input */}
        <div className="mb-4">
          <Input.Search
            placeholder="Search by title..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full max-w-xs"
            allowClear
            enterButton
          />
        </div>

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
                <div className="relative w-full h-[250px]">
                  <iframe
                    sandbox="allow-same-origin allow-scripts"
                    src={product.link}
                    frameBorder="0"
                    title={product.title}
                    allowFullScreen
                    className="object-cover w-full h-full"
                    allow="autoplay; encrypted-media"
                  />
                  {/* <img
                    alt={product.title}
                    src={product.link}
                    className="object-cover w-full h-full"
                  /> */}
                  <div className="absolute bottom-0 w-full bg-black text-xl bg-opacity-60 font-semibold text-white text-start p-2">
                    {product.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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

export default Manufacturing;

import React, { useEffect, useState } from "react";
import { Card, Spin, message, Modal, Button, Input } from "antd";
import axios from "axios";
import UserLayout from "../Layouts/UserLayout";
import { DownloadOutlined } from "@ant-design/icons";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ProductImage = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const fetchExploreMore = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/explore-more`);

      const filteredData = response.data.filter(
        (item) => item.contentType === "Image"
      );

      setData(filteredData);
    } catch (error) {
      message.error("Failed to fetch data");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/user/get-all-images`);
      setProducts(response.data.images);
      setFilteredProducts(response.data.images);
    } catch (error) {
      message.error("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    fetchExploreMore();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setFilteredProducts(products);
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
    link.download = "downloaded-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <UserLayout>
      <div className="p-6">
        <div className="w-full mb-2 pb-2 px-4 bg-gradient-to-r from-blue-500 to-red-300 shadow-lg rounded-lg">
          <h1 className="text-2xl pt-4 font-bold text-white">
            Use Our Best Images for Your Website
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
                <div className="relative w-full h-[300px] overflow-hidden">
                  <iframe
                    src={product.link}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      transform: "scale(1.7)",
                      objectFit: "cover",
                      border: "none",
                    }}
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
              window.open(item.link, "_blank");
            });
          }}
        >
          Explore more..
        </Button>

        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
          centered
        >
          <div className="flex flex-col items-center">
            {selectedImage && (
              <>
                <iframe
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

export default ProductImage;

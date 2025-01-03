import React from "react";
import UserLayout from "../Layouts/UserLayout";
import { Card } from "antd";

const HowWeWork = () => {
  const steps = [
    {
      id: 1,
      title: "Pick Products",
      description:
        "Browse a huge selection of handicraft products from our gallery.",
      image:
        "https://one.saumiccraft.com/static/media/photo1.602b239a8895a1348511.webp",
    },
    {
      id: 2,
      title: "Account Opening & Listing",
      description:
        "Our managers will open accounts on the desired ecommerce platform & list the products selected by you.",
      image:
        "https://one.saumiccraft.com/static/media/Account.665ca69e6c2eceb2678e.webp",
    },
    {
      id: 3,
      title: "You Receive Order",
      description:
        "Once product listing is done, you will start receiving orders.",
      image:
        "https://one.saumiccraft.com/static/media/Order.9809a23765f73b87ca28.webp",
    },
    {
      id: 4,
      title: "Packaging",
      description:
        "We ensure safe packaging with a four layer corrugated box for maximum protection.",
      image:
        "https://one.saumiccraft.com/static/media/pack.2d0d73cd4bd5f0ad93e2.webp",
    },
    {
      id: 5,
      title: "Dispatching",
      description: "Orders will be directly dispatched from our warehouse.",
      image:
        "https://one.saumiccraft.com/static/media/Dispatch.b42bdc053e06fb9a068b.webp",
    },
  ];

  return (
    <UserLayout>
      <div className="bg-gray-100 p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-8 text-center underline bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
          How We Work
        </h1>

        <div className="flex flex-col gap-6">
          {steps.map((step) => (
            <Card
              key={step.id}
              className="bg-white rounded-lg shadow-lg w-full"
              bodyStyle={{ padding: "20px" }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pr-4">
                {/* Number Indicator */}
                <div className="flex-shrink-0">
                  <div className="bg-red-500 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center text-xl shadow-md">
                    #{step.id}
                  </div>
                </div>
                {/* Text Content */}
                <div className="flex-1 mt-16">
                  <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
                  <p className="text-black-600 text-base">{step.description}</p>
                </div>
                {/* Image */}
                <div className="flex-shrink-0 w-full md:w-1/3">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="rounded-lg shadow-md w-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default HowWeWork;

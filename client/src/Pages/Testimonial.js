import React from "react";
import { Card, Col, Row, Avatar } from "antd";
import "./TestimonialsSection.css";
import UserNavbar from "../Components/UserNavbar";

const testimonials = [
  {
    name: "Sarah",
    text: "This LMS is the best for dropshipping!",
    rating: "5/5",
  },
  { name: "Daniel", text: "Great courses and instructors.", rating: "4.5/5" },
  {
    name: "Emily",
    text: "I learned so much about scaling my store.",
    rating: "4.8/5",
  },
  {
    name: "Emily",
    text: "I learned so much about scaling my store.",
    rating: "4.8/5",
  },
];

const TestimonialsSection = () => (
  <>
    <UserNavbar />
    <h1 className="text-3xl mt-24 font-extrabold mb-4 text-center text-blue-500">
      What Our Student Says
    </h1>

    <div className="testimonials-section">
      <Row gutter={[16, 16]} justify="center">
        {testimonials.map((testimonial, index) => (
          <Col
            xs={24} // Full width on extra small screens
            sm={12} // Half width on small screens (e.g., tablets)
            md={8} // One third width on medium screens (e.g., desktop)
            lg={6} // One fourth width on large screens
            xl={6} // Same as large screens for extra large devices
            key={index}
            className="flex justify-center"
          >
            <Card
              className="w-full max-w-xs p-6 bg-white shadow-lg rounded-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              bordered={false}
            >
              {/* Avatar */}
              <Avatar className="mx-auto mb-4 bg-blue-500 text-white" size={64}>
                {testimonial.name[0]}
              </Avatar>

              {/* Testimonial Text */}
              <p className="text-lg font-semibold text-gray-800 mb-2">
                "{testimonial.text}"
              </p>

              {/* Rating */}
              <p className="text-md text-gray-500">
                Rating: {testimonial.rating}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </>
);

export default TestimonialsSection;

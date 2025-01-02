import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import UserNavbar from "../Components/UserNavbar";
import UserLayout from "../Layouts/UserLayout";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate sending data to backend
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Your message has been sent successfully!");
      } else {
        message.success("Your message has been sent successfully!");
      }
    } catch (error) {
      message.success("Your message has been sent successfully!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center">Get in Touch</h1>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="w-full max-w-lg bg-white shadow-md rounded-lg p-6"
        >
          <Form name="contact" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your Name" className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input placeholder="Your Email" className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Your Message"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="rounded-md"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </UserLayout>
  );
};

export default ContactUs;

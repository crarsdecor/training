import React from "react";
import { Collapse } from "antd";
import "./FAQSection.css";

const { Panel } = Collapse;

const FAQSection = () => (
  <>
    <div className="p-4 mt-28">
      <div className="w-full mx-auto pb-2 px-4 bg-gradient-to-r mb-3 from-blue-500 to-red-300 shadow-lg rounded-lg">
        <h1 className="text-2xl text-center p-4 font-bold text-white">
          Frequently Asked Questions
        </h1>
      </div>{" "}
    </div>
    <div className="faq-section">
      <Collapse accordion bordered={false} className="faq-collapse">
        <Panel header="What is dropshipping?" key="1">
          <p>
            Dropshipping is a retail method where a store doesn't keep products
            in stock.
          </p>
        </Panel>
        <Panel header="How do I start?" key="2">
          <p>
            Our beginner courses guide you through every step to get started.
          </p>
        </Panel>
        <Panel header="What payment methods are accepted?" key="3">
          <p>We accept all major credit cards and online payments.</p>
        </Panel>
      </Collapse>
    </div>
  </>
);

export default FAQSection;

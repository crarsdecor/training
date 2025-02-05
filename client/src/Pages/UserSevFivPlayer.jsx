import React, { useState } from "react";
import { Radio, message } from "antd";
import SevFivTraining from "./SevFivTraining";
import SevFivTrainingWebsite from "./SevFivTrainingWebsite";
import UserLayout from "../Layouts/UserLayout";

const AmazonId = localStorage.getItem("enrollmentIdAmazon");
const WebsiteId = localStorage.getItem("enrollmentIdWebsite");

const UserSevFivPlayer = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (value) => {
    if (value === "amazon" && (!AmazonId || AmazonId === "undefined")) {
      message.error("You are not enrolled yet for Amazon.");
      return;
    }
    if (value === "website" && (!WebsiteId || WebsiteId === "undefined")) {
      message.error("You are not enrolled yet for Website.");
      return;
    }
    setSelectedOption(value);
  };

  return (
    <UserLayout>
      <div className="p-6">
        <Radio.Group
          className="mb-4"
          onChange={(e) => handleSelection(e.target.value)}
          value={selectedOption}
        >
          {AmazonId && <Radio.Button value="amazon">Amazon</Radio.Button>}
          {WebsiteId && <Radio.Button value="website">Website</Radio.Button>}
        </Radio.Group>

        <div>
          {selectedOption === null ? (
            <img
              src="/logo2.png" // Change this to the actual image path
              alt="Select an option"
              className="mx-auto w-64 h-48"
            />
          ) : selectedOption === "amazon" ? (
            <SevFivTraining />
          ) : (
            <SevFivTrainingWebsite />
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default UserSevFivPlayer;

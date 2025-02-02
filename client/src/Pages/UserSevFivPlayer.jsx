import React, { useState } from "react";
import { Radio } from "antd";
import SevFivTraining from "./SevFivTraining";
import SevFivTrainingWebsite from "./SevFivTrainingWebsite";

const AmazonComponent = () => (
  <div className="p-4 bg-blue-100 rounded-lg">Amazon Content</div>
);
const WebsiteComponent = () => (
  <div className="p-4 bg-green-100 rounded-lg">Website Content</div>
);

const UserSevFivPlayer = () => {
  const [selectedOption, setSelectedOption] = useState("amazon");

  return (
    <div className="p-6 mt-16">
      <Radio.Group
        onChange={(e) => setSelectedOption(e.target.value)}
        value={selectedOption}
      >
        <Radio.Button value="amazon">Amazon</Radio.Button>
        <Radio.Button value="website">Website</Radio.Button>
      </Radio.Group>

      <div>
        {selectedOption === "amazon" ? (
          <SevFivTraining />
        ) : (
          <SevFivTrainingWebsite />
        )}
      </div>
    </div>
  );
};

export default UserSevFivPlayer;

import React, { useState } from "react";
import { Radio } from "antd";
import SevFivTraining from "./SevFivTraining";
import SevFivTrainingWebsite from "./SevFivTrainingWebsite";

const AmazonId = localStorage.getItem("enrollmentIdAmazon");
const WebsiteId = localStorage.getItem("enrollmentIdWebsite");
console.log(AmazonId, WebsiteId);

const UserSevFivPlayer = () => {
  const [selectedOption, setSelectedOption] = useState("amazon");

  return (
    <div className="p-6 mt-16">
      <Radio.Group
        onChange={(e) => setSelectedOption(e.target.value)}
        value={selectedOption}
      >
        {AmazonId !== "undefined" && (
          <Radio.Button value="amazon">Amazon</Radio.Button>
        )}
        {WebsiteId !== "undefined" && (
          <Radio.Button value="website">Website</Radio.Button>
        )}
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

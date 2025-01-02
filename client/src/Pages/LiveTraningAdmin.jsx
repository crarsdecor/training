import React, { useState } from "react";
import { Radio } from "antd"; // Import Radio component from Ant Design
import AdminLayout from "../Layouts/AdminLayout";

import Upcoming from "../Components/Upcomming";
import Previous from "../Components/Previous";

const LiveTraningAdmin = () => {
  const [view, setView] = useState("previous"); // State to toggle views

  const handleViewChange = (e) => {
    setView(e.target.value); // Update the view state based on the selected Radio button
  };

  return (
    <AdminLayout>
      <div>
        {/* Radio Group for toggling views */}
        <Radio.Group
          onChange={handleViewChange}
          value={view}
          style={{ marginBottom: "1rem" }}
        >
          <Radio.Button value="previous">Previous</Radio.Button>
          <Radio.Button value="upcoming">Upcoming</Radio.Button>
        </Radio.Group>

        {/* Render the appropriate standalone component */}
        {view === "previous" ? <Previous /> : <Upcoming />}
      </div>
    </AdminLayout>
  );
};

export default LiveTraningAdmin;

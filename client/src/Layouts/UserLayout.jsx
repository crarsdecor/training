import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import UserNavbar from "../Components/UserNavbar";
import Footer from "../Components/Footer";

const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route
  const [activeLink, setActiveLink] = useState("dashboard");

  // Update active link based on the current path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("userdash")) setActiveLink("dashboard");
    else if (path.includes("user-tickets")) setActiveLink("tickets");
    else if (path.includes("appointments")) setActiveLink("appointments");
    else if (path.includes("raise-ticket")) setActiveLink("raise-ticket");
  }, [location]); // Run this effect whenever the location changes

  return (
    <div className="flex pt-4 lg:pt-20 h-screen flex-col">
      {/* Content Area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar */}
        <UserNavbar />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto mt-16 lg:mt-0">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;

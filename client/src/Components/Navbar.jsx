import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleRaiseTicketClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/raise-ticket");
    } else {
      navigate("/login");
    }
  };
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogoClick = () => {
    if (token && role === "user") {
      navigate("/userdash");
    } else if (token && role === "manager") {
      navigate("/managerdash");
    } else if (token && role === "admin") {
      navigate("/admindash");
    } else if (token && role === "supervisor") {
      navigate("/supervisordash");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md px-4 lg:px-8 flex items-center justify-between h-20 z-50">
      <div className="flex items-center space-x-4">
        {/* Menu Button for Mobile */}
        {token ? (
          <button
            onClick={toggleSidebar}
            className="text-gray-800 focus:outline-none lg:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        ) : (
          <></>
        )}
        {/* Logo */}
        <img
          src="https://support.saumiccraft.com/wp-content/uploads/2023/05/logo-saumic-new.png"
          alt="Logo"
          className="h-14 w-auto hover:cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>
      {/* Navbar items */}
      <nav className="hidden lg:flex space-x-8 items-center">
        <button
          onClick={() => navigate("/")}
          className="text-gray-800 hover:text-blue-600"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/courses")}
          className="text-gray-800 hover:text-blue-600"
        >
          Courses
        </button>
        <button
          onClick={() => navigate("/testimonials")}
          className="text-gray-800 hover:text-blue-600"
        >
          Testimonials
        </button>
        <button
          onClick={() => navigate("/aboutus")}
          className="text-gray-800 hover:text-blue-600"
        >
          About Us
        </button>
      </nav>
      {/* Raise Ticket Button (Login for non-authenticated users) */}
      <div>
        {/* <Button
          onClick={handleRaiseTicketClick}
          type="primary"
          className="bg-gradient-to-r from-blue-800 to-blue-400 hover:from-blue-700 hover:to-blue-500 font-bold shadow-lg hover:shadow-xl"
        >
          {token ? "Raise Ticket" : "Login"}
        </Button> */}
      </div>
    </header>
  );
};

export default Navbar;

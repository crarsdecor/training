import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleRaiseTicketClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/raise-ticket");
    } else {
      navigate("/login");
    }
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/"); // Redirect to home after logout
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
    <header className="fixed top-0 left-0 w-full bg-white shadow-md px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between h-auto lg:h-20 z-50">
      {/* Top Section: Logo */}
      <div className="flex items-center justify-between w-full lg:w-auto py-2 lg:py-0">
        <img
          src="/logo2.png"
          alt="Logo"
          className="h-14 w-auto hover:cursor-pointer"
          onClick={handleLogoClick}
        />
        {/* Raise Ticket / Login Button (Visible only on mobile) */}
        <div className="lg:hidden">
          {token ? (
            <Button
              onClick={handleLogoutClick}
              type="primary"
              className="bg-gradient-to-r from-red-800 to-red-400 hover:from-red-700 hover:to-red-500 font-bold shadow-lg hover:shadow-xl"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={handleRaiseTicketClick}
              type="primary"
              className="bg-gradient-to-r from-blue-800 to-blue-400 hover:from-blue-700 hover:to-blue-500 font-bold shadow-lg hover:shadow-xl ml-4"
            >
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="w-full lg:w-auto overflow-x-auto lg:overflow-visible whitespace-nowrap">
        <ul className="flex lg:flex-row flex-nowrap lg:justify-end items-center space-x-6 px-4 lg:px-0 py-2 lg:py-0">
          <li>
            <button
              onClick={() => navigate("/")}
              className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"
            >
              Home
            </button>
          </li>
          <li>
            {token ? (
              <button
                onClick={() => navigate("/75daystraining")}
                className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                75 Days Training
              </button>
            ) : (
              <button
                onClick={() => navigate("/courses")}
                className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                Courses
              </button>
            )}
          </li>
          <li>
            {token ? (
              <button
                onClick={() => navigate("/ebook")}
                className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                Ebook
              </button>
            ) : (
              <button
                onClick={() => navigate("/how-we-work")}
                className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                How We Work
              </button>
            )}
          </li>
          <li>
            {token ? (
              <button
                onClick={() => navigate("/regular-update")}
                className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                Regular Update
              </button>
            ) : (
              <button
                onClick={() => navigate("/artists")}
                className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                Artists
              </button>
            )}
          </li>
          <li>
            {token ? (
              <button
                onClick={() => navigate("/social-media-content")}
                className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                Social Media Content
              </button>
            ) : (
              <button
                onClick={() =>
                  window.open("https://saumiccraft.com/", "_blank")
                }
                className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                Saumic Craft
              </button>
            )}
          </li>
          <li>
            {token ? (
              <button
                onClick={() => navigate("/live-training")}
                className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                Live Training
              </button>
            ) : (
              <button className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"></button>
            )}
          </li>
          <li>
            {token ? (
              <button
                onClick={() => navigate("/imfw")}
                className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                IMFW
              </button>
            ) : (
              <button className="text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors"></button>
            )}
          </li>
        </ul>
      </nav>

      {/* Raise Ticket / Login Button (Visible only on larger screens) */}
      <div className="hidden lg:flex lg:items-center lg:ml-4">
        {token ? (
          <Button
            onClick={handleLogoutClick}
            type="primary"
            className="bg-gradient-to-r from-red-800 to-red-400 hover:from-red-700 hover:to-red-500 font-bold shadow-lg hover:shadow-xl"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={handleRaiseTicketClick}
            type="primary"
            className="bg-gradient-to-r from-blue-800 to-blue-400 hover:from-blue-700 hover:to-blue-500 font-bold shadow-lg hover:shadow-xl"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default UserNavbar;

import useAuthHook from "@/hooks/useAuthHook";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { handleLogout } = useAuthHook();
  return (
    <nav className="bg-[#3d9f80] text-white py-4">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-bold">
              Romblon State University Admin Portal
            </h4>
          </div>
          <div className="flex space-x-4">
            <Link to="/home" className="text-sm hover:text-gray-400">
              Home
            </Link>
            <Link to="/manage-building" className="text-sm hover:text-gray-400">
              Manage Building
            </Link>
            <Link to="/about" className="text-sm hover:text-gray-400">
              About
            </Link>
            <Link to="/profile" className="text-sm hover:text-gray-400">
              Profile
            </Link>

            <button
              className="text-sm hover:text-gray-400 focus:outline-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

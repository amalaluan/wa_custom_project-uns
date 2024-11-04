import { useAuth } from "@/context/AuthContext";
import useAuthHook from "@/hooks/useAuthHook";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const { handleLogout } = useAuthHook();
  const { userData } = useAuth();
  const location = useLocation();

  const activeLink = location.pathname;

  return (
    <nav className="bg-[#00413d] text-white py-4">
      <div className="mx-auto max-w-[1140px]">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-bold">
                Romblon State University Admin Portal
              </h4>
            </div>
            <div className="flex space-x-4">
              {userData?.role == "superadmin" ? (
                <Link
                  to="/manage-admins"
                  className={`text-sm hover:text-gray-400 ${
                    activeLink == "/manage-admins" ? "text-[#FF9933]" : ""
                  }`}
                >
                  Manage Admins
                </Link>
              ) : (
                ""
              )}
              <Link
                to="/home"
                className={`text-sm hover:text-gray-400 ${
                  activeLink == "/home" ? "text-[#FF9933]" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/manage-building"
                className={`text-sm hover:text-gray-400 ${
                  activeLink == "/manage-building" ? "text-[#FF9933]" : ""
                }`}
              >
                Manage Building
              </Link>
              <Link
                to="/about"
                className={`text-sm hover:text-gray-400 ${
                  activeLink == "/about" ? "text-[#FF9933]" : ""
                }`}
              >
                About
              </Link>
              <Link
                to="/profile"
                className={`text-sm hover:text-gray-400 ${
                  activeLink == "/profile" ? "text-[#FF9933]" : ""
                }`}
              >
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
      </div>
    </nav>
  );
};

export default Navigation;

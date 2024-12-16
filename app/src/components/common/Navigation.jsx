import { useAuth } from "@/context/AuthContext";
import useAuthHook from "@/hooks/useAuthHook";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/rsu-logo.png";
import useProfileHook from "@/hooks/useProfileHook";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

const Navigation = () => {
  const { handleLogout } = useAuthHook();
  const { userData } = useAuth();
  const location = useLocation();
  const activeLink = location.pathname;

  const { state } = useProfileHook();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getItem = sessionStorage.getItem("profile");
    setImage(getItem || state?.profileUrl);
  }, [location, state]);

  return (
    <nav className="bg-[#00413d] text-white py-4">
      <div className="mx-auto max-w-[1140px]">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src={logo} className="h-[40px] w-[40px]" alt="" />

              <h4 className="text-lg font-bold">RSU-SchoolGo</h4>
            </div>
            <div className="flex items-center space-x-4">
              {/* {userData?.role == "superadmin" ? (
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
              )} */}
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

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="text-sm hover:text-gray-400 focus:outline-none">
                    Logout
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sign out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you would like to sign out your account?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      className="bg-[#00413d] hover:bg-[#1B3409]"
                      onClick={handleLogout}
                    >
                      Continue
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Link to="/profile">
                <div>
                  <img
                    src={image}
                    className="h-[40px] w-[40px] bg-white rounded-full aspect-square object-cover object-center"
                    alt=""
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

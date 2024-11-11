import React from "react";
import logo from "@/assets/rsu-logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#00413d] text-white py-4">
      <div className="max-w-[1140px] px-4 mx-auto">
        <div className="flex flex-col items-end justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <img src={logo} className="h-[70px] w-[70px] mb-2" alt="" />
            <h4 className="text-lg font-bold">
              Romblon State University Admin Portal
            </h4>
            <p className="text-sm">
              &copy; 2024 Romblon State University. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

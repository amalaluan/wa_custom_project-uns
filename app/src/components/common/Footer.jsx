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

          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-gray-400">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-gray-400">
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-4 text-sm text-center text-gray-400">
          Built with ❤️ by the University IT Team
        </div>
      </div>
    </footer>
  );
};

export default Footer;

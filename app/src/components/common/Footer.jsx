import React from "react";
import iso_standard_ms from "@/assets/iso_standard_ms.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#00413d] text-white py-4">
      <div className="max-w-[1140px] px-4 mx-auto">
        <div className="flex flex-col items-end justify-between md:flex-row">
          <div className="flex items-center justify-between w-full mb-4 md:mb-0">
            <p className="text-sm">
              &copy; Romblon State University: Serving with honor and
              excellence.
            </p>
            <img src={iso_standard_ms} className="h-12" alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

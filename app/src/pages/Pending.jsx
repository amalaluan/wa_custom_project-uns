import Footer from "@/components/common/Footer";
import Navigation from "@/components/common/Navigation";
import React from "react";

const Pending = () => {
  return (
    <div>
      <Navigation />

      <main className="max-w-[1140px] px-4 py-8 mx-auto">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/81/Stop_sign.png"
          alt=""
          className="h-[250px] m-auto"
        />
        <div className="text-center">
          <p className="mt-4 mb-2 text-2xl">
            Account Status: <span className="font-medium">Pending</span>
          </p>
          <p className="mb-1 text-sm text-gray-500">
            Your account is currently in a <strong>pending</strong> state. You
            will not be allowed to access any system features until verification
            is complete.
          </p>
          <p className="mb-2 text-sm text-gray-500">
            If the verification process is taking longer than expected, please
            contact our support:
          </p>
          <ul className="text-sm">
            <li>
              <span className="font-medium">Email:</span>{" "}
              <a
                href="mailto:ferrytimothyjames@gmail.com"
                className="bg-yellow-500"
              >
                ferrytimothyjames@gmail.com
              </a>
            </li>
            <li>
              <span className="font-medium">Phone:</span>{" "}
              <a href="tel:+091234566788" className="bg-yellow-500">
                091234566788
              </a>
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pending;

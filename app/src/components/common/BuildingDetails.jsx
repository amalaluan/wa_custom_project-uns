import React from "react";
import { Button } from "../ui/button";
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";
import CarouselInit from "./Carousel";

const BuildingDetails = ({ handleGoBack, selectedData }) => {
  return !selectedData ? (
    <p>Please wait while loading ...</p>
  ) : (
    <>
      <Button
        variant="ghost"
        className="flex items-center gap-2 px-0 text-xs font-normal"
        onClick={handleGoBack}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Go back</span>
      </Button>

      <div className="mt-4">
        <h3 className="mb-2 font-semibold">{selectedData.name}</h3>

        {selectedData.services_title.map((item, index) => {
          const temp_services = selectedData.services[index];
          const services = temp_services?.split
            ? temp_services.split("_")
            : temp_services;

          return (
            <div className="pt-2 mb-2 border-t" key={index}>
              <p className="py-2 font-medium">{item}</p>

              <p className="font-medium">Services</p>
              <ul className="mb-2">
                {services.map((service, si) => {
                  return (
                    <li className="text-sm" key={si}>
                      - {service}
                    </li>
                  );
                })}
              </ul>

              <p className="">
                <span className="font-medium">Head/Director:</span>{" "}
                {selectedData.head[index] || "No data found"}
              </p>
              <p className="">
                <span className="font-medium">Contact Number:</span>{" "}
                {selectedData.contact[index] || "No data found"}
              </p>
              <p className="pb-4 ">
                <span className="font-medium">Email:</span>{" "}
                {selectedData.email[index] || "No data found"}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BuildingDetails;

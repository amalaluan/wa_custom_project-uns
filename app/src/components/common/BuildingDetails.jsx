import React from "react";
import { Button } from "../ui/button";
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";
import CarouselInit from "./Carousel";

const BuildingDetails = ({ state, handleGoBack }) => {
  return !state.selectedData ? (
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
        <h3 className="mb-4 font-semibold">{state.selectedData.name}</h3>

        {state.distances.map((item, index) => {
          return (
            <div key={index} className="py-4 border-t">
              <p className="font-semibold ">
                Travel Information from Gate {index + 1}
              </p>
              <p className="text-sm">
                Distance: {item.distance.toFixed(2) * 1000} meter/s.
              </p>
              <p className="text-sm">Walk: {item.walk} min/s.</p>
              <p className="text-sm">Bike: {item.bike} min/s.</p>
            </div>
          );
        })}

        {state.selectedData.services_title.map((item, index) => {
          const temp_services = state.selectedData.services[index];
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
                {state.selectedData.head[index] || "No data found"}
              </p>
              <p className="">
                <span className="font-medium">Contact Number:</span>{" "}
                {state.selectedData.contact[index] || "No data found"}
              </p>
              <p className="pb-4 ">
                <span className="font-medium">Email:</span>{" "}
                {state.selectedData.email[index] || "No data found"}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BuildingDetails;

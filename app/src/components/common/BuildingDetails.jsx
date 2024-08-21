import React from "react";
import { Button } from "../ui/button";
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";
import CarouselInit from "./Carousel";

const BuildingDetails = ({ handleGoBack, selectedBuilding }) => {
  return (
    <>
      <Button
        variant="ghost"
        className="flex items-center gap-2 px-0 text-xs font-normal"
        onClick={handleGoBack}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Go back</span>
      </Button>
      <p className="mt-4 mb-2 text-base font-semibold">Building images</p>
      <hr className="mb-4" />
      <CarouselInit />
      <p className="mt-8 mb-2 text-base font-semibold">About the building</p>
      <hr className="mb-4" />
      <p className="text-sm text-justify ">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum at,
        veniam esse beatae reiciendis omnis fugit fugiat officia provident
        quaerat a ab repellendus rerum perferendis odit. Suscipit repellat
        ratione vel saepe, architecto officia veritatis sit eius dolore impedit
        beatae quod est quo. Dignissimos asperiores cum vitae reprehenderit
        dolore dolores consequuntur!
      </p>
      <p className="mt-8 mb-2 text-base font-semibold">Services offered</p>
      <hr className="mb-4" />
      <ul>
        <li className="text-sm font-medium">Library Services</li>
        <p className="mb-1 text-sm">
          Extensive collection of academic books, journals, and digital
          resources.
        </p>
        <li className="text-sm font-medium">Sports Facilities</li>
        <p className="mb-1 text-sm">
          Indoor gymnasium and outdoor sports fields.
        </p>
        <li className="text-sm font-medium">Counseling and Support</li>
        <p className="mb-1 text-sm">
          Academic counseling and career guidance services.
        </p>
      </ul>
      <p className="mt-8 mb-2 text-base font-semibold">Distance from gates</p>
      <hr className="mb-4" />
      <ul>
        <li className="text-sm font-medium">From Gate 1</li>
        <p className="text-sm">Distance: 1 (km)</p>
        <p className="mb-1 text-sm">Walking time: 15 mins</p>
      </ul>
      <p className="mt-8 mb-2 text-base font-semibold">Danger zone</p>
      <hr className="mb-4" />
      <Button
        variant="outline"
        className="flex items-center gap-2 text-xs font-semibold text-red-700 hover:bg-red-700 hover:text-white"
      >
        <TrashIcon className="w-4 h-4" />
        <span>Delete building</span>
      </Button>
    </>
  );
};

export default BuildingDetails;

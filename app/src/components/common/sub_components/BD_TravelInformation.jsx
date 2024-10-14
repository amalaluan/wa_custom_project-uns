import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BD_TravelInformation = ({ distances }) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>Travel Information</AccordionTrigger>
      <AccordionContent>
        {distances?.map((item, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm font-semibold">From Gate {index + 1}</p>
            <p className="text-xs">Distance: {item.distance * 1000} meters.</p>
            <p className="text-xs">Walk: {item.walk} mins.</p>
            <p className="text-xs">Bike: {item.bike} mins.</p>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default BD_TravelInformation;

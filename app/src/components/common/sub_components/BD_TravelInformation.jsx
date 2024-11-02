import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const colors = ["#FF9933", "#50BFE6", "#66FF66"];

const BD_TravelInformation = ({ distances, mode }) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>Travel Information</AccordionTrigger>
      <AccordionContent>
        {distances?.map((item, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm font-semibold">From Gate {index + 1}</p>
            <hr className={`my-2 border-t-2 border-t-[${colors[index]}]`} />
            <p className="text-xs">
              Distance: {Math.round(item.distance * 1000 * 10) / 10} meters.
            </p>
            {!mode ? (
              <p className="text-xs">Walk: {item.walk} mins.</p>
            ) : (
              <p className="text-xs">Vehicle: {item.bike} mins.</p>
            )}
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default BD_TravelInformation;

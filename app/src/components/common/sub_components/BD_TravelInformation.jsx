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
            <p className="text-sm font-semibold">
              {index != 2 ? `From Gate ${index + 1}` : "From KiwKiw Gate"}
            </p>
            <hr
              className={`my-2 border-t-2 ${
                index == 0
                  ? "border-t-[#50BFE6]"
                  : index == 1
                  ? "border-t-[#66FF66]"
                  : "border-t-[#ff017e]"
              }`}
            />
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

import React from "react";
import BD_ServiceDetails from "./BD_ServiceDetails";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BD_ServicesAccordion = ({ selectedData }) => (
  <Accordion type="single" collapsible className="w-full">
    {selectedData.services_title.map((item, index) => {
      const services = selectedData?.services[index]?.split("_") || [];

      return (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            {item || `${selectedData.name} Service`}
          </AccordionTrigger>
          <AccordionContent>
            <BD_ServiceDetails
              services={services}
              selectedData={selectedData}
              index={index}
            />
          </AccordionContent>
        </AccordionItem>
      );
    })}
  </Accordion>
);

export default BD_ServicesAccordion;

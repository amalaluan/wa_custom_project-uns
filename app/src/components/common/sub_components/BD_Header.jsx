import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import React, { useState } from "react";
import BD_H_Content from "./BD_H_Content";

const BD_Header = ({ handleGoBack, selectedData, setBuildingJson, udf }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(selectedData);

  return (
    <div className="flex items-center justify-between pb-2">
      <Button
        className="bg-[#00413d] hover:bg-[#1B3409]"
        onClick={handleGoBack}
      >
        Go back
      </Button>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            size="sm"
            className="border rounded-sm bg-[#EBF7E3] hover:bg-[#9BD770]"
            variant="ghost"
          >
            Edit
          </Button>
        </DrawerTrigger>
        <BD_H_Content
          initstate={selectedData}
          isOpen={setIsOpen}
          setBuildingJson={setBuildingJson}
          udf={udf}
        />
      </Drawer>
    </div>
  );
};

export default BD_Header;

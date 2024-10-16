import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import React, { useState } from "react";
import BD_H_Content from "./BD_H_Content";

const BD_Header = ({ handleGoBack, selectedData, setBuildingJson, udf }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between pb-2">
      <Button onClick={handleGoBack}>Go back</Button>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button size="sm" variant="ghost">
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

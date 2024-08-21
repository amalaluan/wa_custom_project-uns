import React from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import ModalInstance from "./ModalInstance";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import MapContent from "./MapContent";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import TAIWT from "./TextAreaInstanceWithText";

const Operations = ({ setSelectedBuilding }) => {
  const show = {
    building: true,
    boundary: true,
    path: false,
  };

  return (
    <div className="text-sm">
      <p className="mb-2 text-base font-semibold">Operations</p>
      <hr className="mb-4" />
      <div className="flex gap-2">
        <ModalInstance>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-xs font-normal"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add building</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="h-[70vh]  overflow-hidden">
            <div className="relative h-full overflow-y-scroll no-scrollbar">
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-1">
                  How to add new building?
                </AlertDialogTitle>
                <AlertDialogDescription className="mb-4">
                  Follow the steps to add/create new record.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <p className="mb-2 text-sm font-semibold">
                Step 1: Set the location.
              </p>
              <div className="w-full h-[250px] mb-4">
                <MapContent
                  values={show}
                  setSelectedBuilding={setSelectedBuilding}
                />
              </div>

              <p className="mb-2 text-sm font-semibold">
                Step 2: Fill out the following.
              </p>
              <div className="flex flex-col w-full gap-2 pb-4">
                <TAIWT
                  ps={`Short description of the building`}
                  label="About the building (Optional)"
                />

                <TAIWT
                  ps={`Separate every services by "_" (e.g. "Registrar office_Dean's Office")`}
                  label="Services Offered"
                />

                <p className="mt-4 mb-2 text-sm font-semibold">
                  Step 3: Add images (Optional).
                </p>
              </div>
            </div>
            <AlertDialogFooter className="sticky bottom-0 w-full pt-2 bg-white">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </ModalInstance>
      </div>
    </div>
  );
};

export default Operations;

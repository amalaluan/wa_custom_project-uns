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
import TAIWT from "./TextAreaInstanceWithText";
import MapContentPicker from "./MapContentPicker";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";

const Operations = ({ state }) => {
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
              <div className="w-full mb-4">
                <ModalInstance>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" className="text-xs">
                      Set Location
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[700px] max-w-full">
                    <div className="relative h-full overflow-y-scroll no-scrollbar">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="mb-1">
                          Set the location of the building
                        </AlertDialogTitle>
                        <AlertDialogDescription className="mb-4 text-xs">
                          Click the location where you want to add a building
                          coordinate then click "Save Location" button.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="h-[400px]">
                        <MapContentPicker />
                      </div>
                    </div>
                    <AlertDialogFooter className="">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </ModalInstance>
              </div>

              <p className="mb-2 text-sm font-semibold">
                Step 2: Fill out the following.
              </p>
              <div>
                <div>
                  <Label htmlFor="" className="text-xs font-semibold">
                    Service
                  </Label>
                  <Input placeholder="Hello arvin" />
                </div>
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

import Footer from "@/components/common/Footer";
import MapContent from "@/components/common/MapContent";
import Navigation from "@/components/common/Navigation";
import ToggleButton from "@/components/common/ToggleButton";
import { Button } from "@/components/ui/button";
import useMapHook from "@/hooks/useMapHook";
import {
  ArrowLeftIcon,
  DotsVerticalIcon,
  Pencil1Icon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Preferences from "@/components/common/Preferences";
import BuildingDetails from "@/components/common/BuildingDetails";
import RecentChanges from "@/components/common/RecentChanges";

const Home = () => {
  const {
    state,
    handleSwitchChange,
    handleBuildingClick,
    handleGoBack,
    buildingJson,
    setBuildingJson,
    triggerDetailsUpdate,
  } = useMapHook();

  const [travelMode, setTravelMode] = useState(false);
  const handleTravelModeChange = () => {
    setTravelMode((prev) => !prev);
  };

  return (
    <div>
      <Navigation />

      <main className="max-w-[1140px] px-4 py-8 mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-[600px] col-span-2 sticky top-6">
            <MapContent
              state={state}
              handleBuildingClick={handleBuildingClick}
              buildingJson={buildingJson}
            />
          </div>

          <div className="col-span-1 px-8">
            {state?.selectedBuilding ? (
              <>
                <BuildingDetails
                  handleGoBack={handleGoBack}
                  setBuildingJson={setBuildingJson}
                  state={state}
                  udf={triggerDetailsUpdate}
                />
              </>
            ) : (
              <>
                <Preferences
                  show={state?.show}
                  handleSwitchChange={handleSwitchChange}
                />

                <div className="mt-12">
                  <p className="mb-2 text-base font-semibold">Travel Mode</p>
                  <hr className="mb-4" />
                  <div className="flex flex-col gap-2">
                    <ToggleButton
                      name="Travel by walking"
                      id="walk"
                      defaultValue={travelMode}
                      handleChange={handleTravelModeChange}
                    />
                    <ToggleButton
                      name="Travel by driving"
                      id="vehicle"
                      defaultValue={!travelMode}
                      handleChange={handleTravelModeChange}
                    />
                  </div>
                </div>

                <RecentChanges />
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

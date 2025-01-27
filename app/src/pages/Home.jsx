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
import React, { useEffect, useState } from "react";
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
    travelMode,
    handleTravelModeChange,
    selected,
    legendClicked,
  } = useMapHook();

  const [arrayOfLegend, setArrayOfLegend] = useState([]);

  useEffect(() => {
    if (buildingJson) {
      const temp_holder = buildingJson.features;
      let temp_array = [];

      temp_holder.map((item, index) => {
        temp_array.push({
          label:
            (item.properties.id > 9
              ? `${item.properties.id}.`
              : `0${item.properties.id}.`) +
            " " +
            item.properties.name,
          id: item.properties.id,
          coords: item.geometry.coordinates,
        });
      });

      setArrayOfLegend(temp_array);
    }
  }, [buildingJson]);

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
              selected={selected}
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
                  travelMode={travelMode}
                  handleTravelModeChange={handleTravelModeChange}
                />
              </>
            ) : (
              <>
                <div>
                  <p className="mb-2 text-base font-semibold">Legend</p>
                  <hr className="mb-4" />

                  <div className="flex items-center gap-2">
                    <div className="w-3 rounded-full h-3 bg-[#0d98ba]"></div>
                    <p className="text-sm">Boundary</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 rounded-full h-3 bg-[yellow]"></div>
                    <p className="text-sm">Roads</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 rounded-full h-3 bg-[#FD9833]"></div>
                    <p className="text-sm">Buildings</p>
                  </div>
                  <hr className="mb-4" />
                  <div className="flex flex-col gap-2">
                    {arrayOfLegend?.map((item, index) => {
                      return (
                        <p
                          key={index}
                          className="text-xs cursor-pointer hover:underline hover:text-blue-600"
                          onClick={() => legendClicked(item)}
                        >
                          {item.label}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <Preferences
                  show={state?.show}
                  handleSwitchChange={handleSwitchChange}
                />

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

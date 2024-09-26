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

const Home = () => {
  const { state, handleSwitchChange, handleBuildingClick, handleGoBack } =
    useMapHook();

  return (
    <div>
      <Navigation />

      <main className="max-w-[1140px] px-4 py-8 mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-[600px] col-span-2 sticky top-6">
            <MapContent
              state={state}
              handleBuildingClick={handleBuildingClick}
            />
          </div>

          <div className="col-span-1 pl-8">
            {state.selectedBuilding ? (
              !state.selectedData ? (
                <p>Please wait while loading ...</p>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-2 font-normal"
                      onClick={handleGoBack}
                    >
                      <ArrowLeftIcon className="w-4 h-4" />
                      <span className="hidden md:block">Go back</span>
                    </Button>

                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="px-8 pb-8">
                          <h3 className="mt-4 text-4xl font-semibold text-center">
                            {state.selectedData.name}
                            {console.log(state.selectedData)}
                          </h3>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>

                  <h3 className="mt-4 font-semibold uppercase">
                    {state.selectedData.name}
                  </h3>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Travel Information</AccordionTrigger>
                      <AccordionContent>
                        {state.distances.map((item, index) => {
                          return (
                            <div key={index} className="mb-2">
                              <p className="text-sm font-semibold">
                                From Gate {index + 1}
                              </p>
                              <p className="text-xs">
                                Distance: {item.distance.toFixed(2) * 1000}{" "}
                                meter/s.
                              </p>
                              <p className="text-xs">
                                Walk: {item.walk} min/s.
                              </p>
                              <p className="text-xs">
                                Bike: {item.bike} min/s.
                              </p>
                            </div>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <h3 className="mt-8 font-semibold">SERVICES</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {state.selectedData.services_title.map((item, index) => {
                      const temp_services = state.selectedData.services[index];
                      const services = temp_services?.split
                        ? temp_services.split("_")
                        : temp_services;

                      return (
                        <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger>
                            {item || state.selectedData.name + " Service"}
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="">
                              {services.map((service, si) => {
                                return (
                                  service != "" && (
                                    <li className="text-xs" key={si}>
                                      - {service}
                                    </li>
                                  )
                                );
                              })}
                            </ul>

                            <div className="ml-2">
                              <p className="pt-4 text-xs">
                                <span className="font-medium">
                                  Head/Director:
                                </span>{" "}
                                {state.selectedData.head[index] ||
                                  "No data found"}
                              </p>
                              <p className="text-xs">
                                <span className="font-medium">
                                  Contact Number:
                                </span>{" "}
                                {state.selectedData.contact[index] ||
                                  "No data found"}
                              </p>
                              <p className="text-xs">
                                <span className="font-medium">Email:</span>{" "}
                                {state.selectedData.email[index] ||
                                  "No data found"}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>

                  <h3 className="mt-8 mb-4 font-semibold text-red-800">
                    DANGER ZONE
                  </h3>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="destructive">Delete Building</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )
            ) : (
              <>
                <div className="text-sm">
                  <p className="mb-2 text-base font-semibold">Preferences</p>
                  <hr className="mb-4" />
                  <div className="flex flex-col gap-2">
                    <ToggleButton
                      name="Show Boundary"
                      id="boundary"
                      defaultValue={state.show["boundary"]}
                      handleChange={handleSwitchChange}
                    />
                    <ToggleButton
                      name="Show Buildings"
                      id="building"
                      defaultValue={state.show["building"]}
                      handleChange={handleSwitchChange}
                    />
                    <ToggleButton
                      name="Show Paths"
                      id="path"
                      defaultValue={state.show["path"]}
                      handleChange={handleSwitchChange}
                    />
                  </div>
                </div>

                <div className="mt-12">
                  <p className="mb-2 text-base font-semibold">Recent Changes</p>
                  <hr className="mb-4" />
                  <p className="text-sm">No changes was made for this week</p>
                </div>
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

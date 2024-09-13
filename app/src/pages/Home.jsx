import CarouselInit from "@/components/common/Carousel";
import Footer from "@/components/common/Footer";
import MapContent from "@/components/common/MapContent";
import Navigation from "@/components/common/Navigation";
import ToggleButton from "@/components/common/ToggleButton";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const Home = () => {
  const [show, setShow] = useState({
    building: true,
    boundary: true,
    path: true,
  });
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const handleSwitchChange = (name) => {
    setShow((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleGoBack = () => {
    setSelectedBuilding(null);
  };

  return (
    <div>
      <Navigation />

      <main className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-[600px] col-span-2">
            <MapContent
              values={show}
              setSelectedBuilding={setSelectedBuilding}
              setSelectedData={setSelectedData}
            />
          </div>

          <div className="col-span-1 px-8 max-h-[600px] overflow-y-scroll no-scrollbar">
            {selectedBuilding ? (
              !selectedData ? (
                <p>Please wait while loading ...</p>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-0 text-xs font-normal"
                    onClick={handleGoBack}
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>Go back</span>
                  </Button>

                  <div className="mt-4">
                    <h3 className="mb-2 font-semibold">{selectedData.name}</h3>

                    {selectedData.services_title.map((item, index) => {
                      const temp_services = selectedData.services[index];
                      const services = temp_services?.split
                        ? temp_services.split("_")
                        : temp_services;

                      return (
                        <div className="pt-2 mb-2 border-t" key={index}>
                          <p className="py-2 font-medium">{item}</p>

                          <p className="font-medium">Services</p>
                          <ul className="mb-2">
                            {services.map((service, si) => {
                              return (
                                <li className="text-sm" key={si}>
                                  - {service}
                                </li>
                              );
                            })}
                          </ul>

                          <p className="">
                            <span className="font-medium">Head/Director:</span>{" "}
                            {selectedData.head[index] || "No data found"}
                          </p>
                          <p className="">
                            <span className="font-medium">Contact Number:</span>{" "}
                            {selectedData.contact[index] || "No data found"}
                          </p>
                          <p className="pb-4 ">
                            <span className="font-medium">Email:</span>{" "}
                            {selectedData.email[index] || "No data found"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
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
                      defaultValue={show.boundary}
                      handleChange={handleSwitchChange}
                    />
                    <ToggleButton
                      name="Show Buildings"
                      id="building"
                      defaultValue={show.building}
                      handleChange={handleSwitchChange}
                    />
                    <ToggleButton
                      name="Show Paths"
                      id="path"
                      defaultValue={show.path}
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

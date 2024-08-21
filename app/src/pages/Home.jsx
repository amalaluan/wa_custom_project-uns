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

  const handleSwitchChange = (name) => {
    setShow((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleGoBack = () => {
    setSelectedBuilding(null);
  };

  return (
    <div>
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-[600px] col-span-2">
            <MapContent
              values={show}
              setSelectedBuilding={setSelectedBuilding}
            />
          </div>

          <div className="col-span-1 px-8 max-h-[600px] overflow-y-scroll no-scrollbar">
            {selectedBuilding ? (
              <>
                <Button
                  variant="ghost"
                  className="flex gap-2 items-center text-xs font-normal px-0"
                  onClick={handleGoBack}
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span>Go back</span>
                </Button>

                <p className="text-base font-semibold mb-2 mt-4">
                  Building images
                </p>
                <hr className="mb-4" />
                <CarouselInit />

                <p className="text-base font-semibold mb-2 mt-8">
                  About the building
                </p>
                <hr className="mb-4" />
                <p className="text-sm text-justify ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Earum at, veniam esse beatae reiciendis omnis fugit fugiat
                  officia provident quaerat a ab repellendus rerum perferendis
                  odit. Suscipit repellat ratione vel saepe, architecto officia
                  veritatis sit eius dolore impedit beatae quod est quo.
                  Dignissimos asperiores cum vitae reprehenderit dolore dolores
                  consequuntur!
                </p>

                <p className="text-base font-semibold mb-2 mt-8">
                  Services offered
                </p>
                <hr className="mb-4" />
                <ul>
                  <li className="font-medium text-sm">Library Services</li>
                  <p className="mb-1 text-sm">
                    Extensive collection of academic books, journals, and
                    digital resources.
                  </p>

                  <li className="font-medium text-sm">Sports Facilities</li>
                  <p className="mb-1 text-sm">
                    Indoor gymnasium and outdoor sports fields.
                  </p>

                  <li className="font-medium text-sm">
                    Counseling and Support
                  </li>
                  <p className="mb-1 text-sm">
                    Academic counseling and career guidance services.
                  </p>
                </ul>

                <p className="text-base font-semibold mb-2 mt-8">
                  Distance from gates
                </p>
                <hr className="mb-4" />
                <ul>
                  <li className="font-medium text-sm">From Gate 1</li>
                  <p className="text-sm">Distance: 1 (km)</p>
                  <p className="mb-1 text-sm">Walking time: 15 mins</p>
                </ul>
              </>
            ) : (
              <>
                <div className="text-sm">
                  <p className="text-base font-semibold mb-2">Preferences</p>
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
                  <p className="text-base font-semibold mb-2">Recent Changes</p>
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

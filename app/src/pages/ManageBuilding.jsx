import BuildingDetails from "@/components/common/BuildingDetails";
import Footer from "@/components/common/Footer";
import MapContent from "@/components/common/MapContent";
import Navigation from "@/components/common/Navigation";
import Operations from "@/components/common/Operations";
import Preferences from "@/components/common/Preferences";
import RecentChanges from "@/components/common/RecentChanges";
import React, { useState } from "react";

const ManageBuilding = () => {
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

      <main className="container px-4 py-8 mx-auto">
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
                <BuildingDetails
                  handleGoBack={handleGoBack}
                  selectedBuilding={selectedBuilding}
                />
              </>
            ) : (
              <>
                <Operations />

                <Preferences
                  show={show}
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

export default ManageBuilding;

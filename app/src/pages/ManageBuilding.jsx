import BuildingDetails from "@/components/common/BuildingDetails";
import Footer from "@/components/common/Footer";
import MapContent from "@/components/common/MapContent";
import Navigation from "@/components/common/Navigation";
import Operations from "@/components/common/Operations";
import Preferences from "@/components/common/Preferences";
import RecentChanges from "@/components/common/RecentChanges";
import ToggleButton from "@/components/common/ToggleButton";
import useMapHook from "@/hooks/useMapHook";
import React, { useEffect, useState } from "react";

const ManageBuilding = () => {
  const {
    state,
    handleSwitchChange,
    handleBuildingClick,
    handleGoBack,
    buildingJson,
    setBuildingJson,
    triggerDetailsUpdate,
    handleTravelModeChange,
    travelMode,
  } = useMapHook();

  const [arrayOfLegend, setArrayOfLegend] = useState([]);

  useEffect(() => {
    if (buildingJson) {
      const temp_holder = buildingJson.features;
      let temp_array = [];

      temp_holder.map((item, index) => {
        temp_array.push(
          (item.properties.id > 9
            ? `${item.properties.id}.`
            : `0${item.properties.id}.`) +
            " " +
            item.properties.name
        );
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
            />
          </div>

          <div className="col-span-1 px-8">
            {state.selectedBuilding ? (
              <>
                <BuildingDetails
                  handleGoBack={handleGoBack}
                  state={state}
                  setBuildingJson={setBuildingJson}
                  udf={triggerDetailsUpdate}
                  travelMode={travelMode}
                  handleTravelModeChange={handleTravelModeChange}
                />
              </>
            ) : (
              <>
                <Operations
                  len_id={buildingJson?.features?.length}
                  setBuildingJson={setBuildingJson}
                />

                <div>
                  <p className="mb-2 text-base font-semibold">Legend</p>
                  <hr className="mb-4" />
                  <div className="flex flex-col gap-2">
                    {arrayOfLegend?.map((item, index) => {
                      return (
                        <p key={index} className="text-xs">
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <Preferences
                  show={state.show}
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

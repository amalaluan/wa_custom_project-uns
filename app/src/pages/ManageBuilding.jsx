import BuildingDetails from "@/components/common/BuildingDetails";
import Footer from "@/components/common/Footer";
import MapContent from "@/components/common/MapContent";
import Navigation from "@/components/common/Navigation";
import Operations from "@/components/common/Operations";
import Preferences from "@/components/common/Preferences";
import RecentChanges from "@/components/common/RecentChanges";
import useMapHook from "@/hooks/useMapHook";
import React, { useState } from "react";

const ManageBuilding = () => {
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

          <div className="col-span-1 px-8">
            {state.selectedBuilding ? (
              <>
                <BuildingDetails handleGoBack={handleGoBack} state={state} />
              </>
            ) : (
              <>
                <Operations />

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

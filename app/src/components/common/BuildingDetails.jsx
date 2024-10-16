import React from "react";
import BD_Header from "./sub_components/BD_Header";
import { useLocation } from "react-router-dom";
import BD_BuildingInfo from "./sub_components/BD_BuildingInfo";
import BD_TravelInformation from "./sub_components/BD_TravelInformation";
import BD_ServicesAccordion from "./sub_components/BD_ServicesAccordion";
import BD_DangerZone from "./sub_components/BD_DangerZone";

const BuildingDetails = ({ state, handleGoBack, setBuildingJson, udf }) => {
  const { pathname } = useLocation();

  return (
    <>
      <BD_Header
        handleGoBack={handleGoBack}
        selectedData={state?.selectedData}
        setBuildingJson={setBuildingJson}
        udf={udf}
      />
      <BD_BuildingInfo selectedData={state?.selectedData} />
      <BD_TravelInformation distances={state?.distances} />
      <BD_ServicesAccordion selectedData={state?.selectedData} />
      {pathname.includes("manage-building") && (
        <BD_DangerZone
          id={state?.selectedData?.id}
          name={state?.selectedData?.name}
        />
      )}
    </>
  );
};

export default BuildingDetails;

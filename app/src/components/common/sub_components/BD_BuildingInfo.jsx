import React from "react";

const BD_BuildingInfo = ({ name, d_classes }) => (
  <h3 className={`font-semibold uppercase ${d_classes}`}>{name}</h3>
);

export default BD_BuildingInfo;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import boundaryJson from "@/assets/json/boundary.json";
import buildingJson from "@/assets/json/buildings.json";
import pathJson from "@/assets/json/path.json";

// Import your custom icon image
import buildingIconUrl from "@/assets/location_fill.svg";

// Define custom icon
const buildingIcon = new L.Icon({
  iconUrl: buildingIconUrl,
  iconSize: [16, 16], // Size of the icon
  iconAnchor: [8, 8], // Center of the icon
  popupAnchor: [0, -8], // Adjust popup to appear above the center
});

const MapContent = ({ values, setSelectedBuilding }) => {
  const convertCoords = (coords) => {
    return [coords[1], coords[0]];
  };

  const handleBuildingClick = (feature, layer) => {
    if (feature.properties) {
      layer.on("click", () => {
        setSelectedBuilding(convertCoords(feature.geometry.coordinates));
      });
    }
  };

  // Function to convert points to custom markers
  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, { icon: buildingIcon });
  };

  return (
    <MapContainer
      center={[12.396672, 121.986217]}
      zoom={17}
      className="z-0 w-full h-full cursor-grab"
    >
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution='&copy; <a href="https://www.google.com/intl/en-US_US/help/terms_maps.html">Google</a>'
      />
      {values.path && pathJson && (
        <GeoJSON data={pathJson} style={{ color: "magenta" }} />
      )}
      {values.boundary && boundaryJson && (
        <GeoJSON data={boundaryJson} style={{ color: "red", fill: false }} />
      )}
      {values.building && buildingJson && (
        <GeoJSON
          data={buildingJson}
          onEachFeature={handleBuildingClick}
          pointToLayer={pointToLayer}
        />
      )}
    </MapContainer>
  );
};

export default MapContent;

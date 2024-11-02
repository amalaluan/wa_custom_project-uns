import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import boundaryJson from "@/assets/json/boundary.json";
import pathJson from "@/assets/json/path.json";
import buildingIconUrl from "@/assets/location_fill.svg";

// Define custom icon
const buildingIcon = new L.Icon({
  iconUrl: buildingIconUrl,
  iconSize: [16, 16], // Size of the icon
  iconAnchor: [8, 8], // Center of the icon
  popupAnchor: [0, -8], // Adjust popup to appear above the center
});

const MapContent = ({ state, handleBuildingClick, buildingJson }) => {
  // Function to convert points to custom markers
  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, { icon: buildingIcon });
  };

  // Utility function to offset coordinates
  const offsetCoordinates = (coordinates, offset) =>
    coordinates.map(([lng, lat]) => [lng + offset.lng, lat + offset.lat]);

  // Define offsets for each path
  const offsets = [
    { lng: 0.0001, lat: 0.0001 }, // Adjust the offset values to fit your map scale
    { lng: 0.00015, lat: 0.00015 },
    { lng: 0.0002, lat: 0.0002 },
  ];

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
      {state.selectedData == null && state.show.path && pathJson && (
        <GeoJSON data={pathJson} style={{ color: "magenta" }} />
      )}
      {state.show.boundary && boundaryJson && (
        <GeoJSON data={boundaryJson} style={{ color: "red", fill: false }} />
      )}
      {state.show.building && buildingJson && (
        <GeoJSON
          key={JSON.stringify(buildingJson)}
          data={buildingJson}
          onEachFeature={handleBuildingClick}
          pointToLayer={pointToLayer}
        />
      )}

      {state.routeFG1 && (
        <GeoJSON
          key={JSON.stringify(state.routeFG1)}
          data={state.routeFG1}
          style={{ color: "#FF9933" }}
        />
      )}
      {state.routeFG2 && (
        <GeoJSON
          key={JSON.stringify(state.routeFG2)}
          data={state.routeFG2}
          style={{ color: "#50BFE6" }}
        />
      )}
      {state.routeFG3 && (
        <GeoJSON
          key={JSON.stringify(state.routeFG3)}
          data={state.routeFG3}
          style={{ color: "#66FF66" }}
        />
      )}
    </MapContainer>
  );
};

export default MapContent;

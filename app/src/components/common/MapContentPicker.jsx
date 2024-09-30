import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMapEvent,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import boundaryJson from "@/assets/json/boundary.json";
import buildingJson from "@/assets/json/buildings.json";
import buildingIconUrl from "@/assets/location_fill.svg";
import { Button } from "../ui/button";

// Define custom icon
const buildingIcon = new L.Icon({
  iconUrl: buildingIconUrl,
  iconSize: [16, 16], // Size of the icon
  iconAnchor: [8, 8], // Center of the icon
  popupAnchor: [0, -8], // Adjust popup to appear above the center
});

// Component to handle map clicks and show popup
const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  useMapEvent("click", (e) => {
    setPosition(e.latlng); // Set the clicked latlng
  });

  return position === null ? null : (
    <Popup position={position}>
      <div className="mb-2">
        <span>Use this location?</span>
      </div>
      <div className="flex gap-2">
        <Button>Yes, use this.</Button>
        <Button variant="secondary">No</Button>
      </div>
    </Popup>
  );
};

const MapContentPicker = () => {
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

      <GeoJSON data={boundaryJson} style={{ color: "red", fill: false }} />
      <GeoJSON data={buildingJson} pointToLayer={pointToLayer} />

      <LocationMarker />
    </MapContainer>
  );
};

export default MapContentPicker;
